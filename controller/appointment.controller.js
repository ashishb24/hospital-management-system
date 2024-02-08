let appointmentSchema = require('../schema/appointment.schema');
let doctorSchema = require('../schema/doctors.schema');
let { mailer, mail_schedule } = require('../utils/mail');
let { status, message } = require('../validator/utils');
let { getResponseStructure } = require('../constants/response.structure');
let { appointmentId, hour } = require("../utils/utils");
let template = require("../helper/template.helper");
let db = require('../database/appointment.db')
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.create = async (req, res) => {
    try {
        const data = {
            user: req.user._id,
            bookingId: appointmentId(),
            start: req.body.time === "morning" ? "9:30" : req.body.time === "afternoon" ? "12:30" : req.body.time === "evening" ? "17:30" : "",
            end: req.body.time === "morning" ? "10:30" : req.body.time === "afternoon" ? "13:30" : req.body.time === "evening" ? "18:30" : "",
            appointmentDate: req.body.date,
            isOnline: req.body.isOnline,
            doctorId: req.body.doctorId,
        }
        // Checking user in new or not if user already booked appointment isNewPatient wil be false.
        const user = await appointmentSchema.findOne({ user: data['user'] });
        if (user) {
            data.isNewPatient = false;
        }
        const doctor = await doctorSchema.findOne({ _id: data['doctorId'] });
        if (!doctor) {
            return res
                .status(status.success)
                .send(getResponseStructure(status.notfound, "Doctor" + message.notFound))
        }
        // if doctor is available then we are pushing user id.
        doctor.patients = { _id: data['user'] };
        await doctor.save();
        // Checking if given date is holiday or not.
        let isHoliday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][data["appointmentDate"].getDay()];
        if (isHoliday === "Sat" || isHoliday === "Sun") {
            return res
                .status(status.badRequest)
                .send(getResponseStructure(status.badRequest, message.isHoliday))
        }
        // This method is provided current time in india.
        const formatters = [
            new Intl.DateTimeFormat('en-US', { timeStyle: 'short', hour12: false, timeZone: 'Asia/Kolkata' })
        ]
        let currentTime = formatters.map(fmt => { return fmt.format(new Date()) });
        // Checking if user given Date is grater than current date.
        if (data["appointmentDate"] < new Date()) {
            return res
                .status(status.badRequest)
                .send(getResponseStructure(status.badRequest, message.dateLessThan));
        }
        // If user date and current date is equal but the user given time is less than current time, so it will show error.
        if (data["appointmentDate"].toLocaleDateString() === new Date().toLocaleDateString() && parseInt(currentTime[0]) > parseInt(data["start"])) {
            return res
                .status(status.badRequest)
                .send(getResponseStructure(status.badRequest, message.availableTimeSlot));
        }
        const slot = await appointmentSchema.findOne({ appointmentDate: data["appointmentDate"], start: data["start"] });
        // checking slots are available or not.
        if (slot) {
            return res
                .status(status.badRequest)
                .send(getResponseStructure(status.badRequest, message.alreadyBooked));
        }
        const findUser = await appointmentSchema.aggregate([{ $match: { user: data["user"], appointmentDate: data["appointmentDate"] } }]);
        // checking the user has no appointment on the given date.
        // todo : user can only book one appointment on a single day. 
        if (findUser["length"] > 0) {
            return res
                .status(status.badRequest)
                .send(getResponseStructure(status.badRequest, message.userAlreadyBooked));
        }
        // creating email and email_schedule templates for sending user.
        const createTemplate = template.create(req.user.name.toUpperCase(), data["bookingId"], data["appointmentDate"], data["start"], data['end'], doctor['name']);
        // await mailer(req.user.email, "Appointment Confirmation Latter", createTemplate);
        if (data['isOnline'] === true) {
            data.meet_link = "https://meet.google.com/fky-wofh-hfa";
            const templateSchedule = template.schedule(req.user.name.toUpperCase(), data["meet_link"])
            await mail_schedule(req.user.email, "Meeting Remainder!", templateSchedule, 15, hour(data["start"]), data["appointmentDate"].getDate(), data["appointmentDate"].getMonth() + 1)
        }
        // if the all condition is fulfilled then  the  appointment will successfully add in a system.
        await db.create(data)
            .then(() => {
                return res
                    .status(status.successCreated)
                    .send(getResponseStructure(status.successCreated, message.success + req.user.email));
            })
            .catch(() => {
                return res
                    .status(status.badRequest)
                    .send(getResponseStructure(status.badRequest, message.somethingWrong))
            })
    } catch (error) {
        return res
            .status(status.success)
            .send(getResponseStructure(status.notfound, error.toString()));
    }
};

exports.getUserAllAppointment = async (req, res) => {
    try {
        // const appointment = await appointmentSchema.find({ user: req.user._id },
        //     {
        //         bookingId: 1,
        //         start: 1,
        //         end: 1,
        //         appointmentDate: 1,
        //         doctorId: 1,
        //     }
        // );
        const appointment = await appointmentSchema.aggregate([
            {
                $match: {
                    user: ObjectId(req.user._id),
                    isCancelled: false
                }
            },
            {
                $lookup:
                {
                    from: "doctors",
                    localField: "doctorId",
                    foreignField: "_id",
                    as: "inventory_docs"
                }
            }
        ]);
        console.log(appointment);
        if (!appointment) {
            return res
                .status(status.success)
                .send(getResponseStructure(status.notfound, "Appointment" + message.notFound))
        }
        return res
            .status(status.success)
            .send(getResponseStructure(status.success, "Appointment fetch Successfully", { appointment: appointment }));
    } catch (error) {
        return res
            .status(status.success)
            .send(getResponseStructure(status.notfound, error.toString()));
    }
};

exports.previousAppointment = async (req, res) => {
    try {
        const appointment = await appointmentSchema.find({ user: req.user._id, appointmentDate: { $lt: new Date() } },
            {
                user: 1,
                appointmentDate: 1,
                bookingId: 1,
                start: 1,
                end: 1
            }
        );
        if (appointment["length"] < 0) {
            return res
                .status(status.success)
                .send(getResponseStructure(status.notfound, "Appointment" + message.notFound))
        }
        return res
            .status(status.success)
            .send(getResponseStructure(status.success, "Appointment fetch Successfully", { appointment: appointment }));
    } catch (error) {
        return res
            .status(status.success)
            .send(getResponseStructure(status.notfound, error.toString()));
    }
};

exports.futureAppointment = async (req, res) => {
    try {
        const appointment = await appointmentSchema.find({ user: req.user._id, appointmentDate: { $gt: new Date() } },
            {
                user: 1,
                appointmentDate: 1,
                bookingId: 1,
                start: 1,
                end: 1
            }
        );
        if (appointment["length"] < 0) {
            return res
                .status(status.success)
                .send(getResponseStructure(status.notfound, "Appointment" + message.notFound))
        }
        return res
            .status(status.success)
            .send(getResponseStructure(status.success, "Appointment fetch Successfully", { appointment: appointment }));
    } catch (error) {
        return res
            .status(status.success)
            .send(getResponseStructure(status.notfound, error.toString()));
    }
};

exports.cancelAppointment = async (req, res) => {
    try {
        const appointment = await appointmentSchema.find({ _id: req.query.id, user: req.user._id, appointmentDate: { $gt: new Date() } },
            {
                user: 1,
                appointmentDate: 1,
                bookingId: 1,
                start: 1,
                end: 1,
                isCancelled: 1,
                meet_link: 1,
                isDeleted: 1
            }
        );
        if (appointment["length"] < 0 || appointment[0] === undefined) {
            return res
                .status(status.success)
                .send(getResponseStructure(status.notfound, "Appointment" + message.notFound))
        }
        await appointmentSchema.findByIdAndUpdate({ _id: appointment[0]['_id'] }, { updatedAt: new Date(), isCancelled: true, meet_link: null })
            .then(async () => {
                return res
                    .status(status.success)
                    .send(getResponseStructure(status.success, message.cancelled));
            })
            .catch(() => {
                return res
                    .status(status.success)
                    .send(getResponseStructure(status.success, message.somethingWrong));
            })
    } catch (error) {
        return res
            .status(status.success)
            .send(getResponseStructure(status.notfound, error.toString()));
    }
};

exports.update = async (req, res) => {
    try {
        // Find Appointment By their ID
        const appointment = await appointmentSchema.findOne({ _id: req.body.id });
        if (!appointment) {
            return res
                .status(status.success)
                .send(getResponseStructure(status.notfound, "Appointment" + message.notFound))
        }
        // condition for if user token id in not match with Appointment user id
        if (appointment["user"].toString() !== req.user._id.toString()) {
            return res
                .status(status.success)
                .send(getResponseStructure(status.notfound, message.unauthorized))
        }
        // checking given date is not previous date
        if (req.body.date < new Date()) {
            return res
                .status(status.badRequest)
                .send(getResponseStructure(status.badRequest, message.dateLessThan))
        }
        let isHoliday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][req.body.date.getDay()];
        // Checking given date is not holiday date
        if (isHoliday === "Sat" || isHoliday === "Sun") {
            return res
                .status(status.badRequest)
                .send(getResponseStructure(status.badRequest, message.isHoliday))
        }
        const slot = await appointmentSchema.findOne({ appointmentDate: req.body.date, start: req.body.time })
        // checking the provided user time and date slots are not booked already
        if (slot) {
            return res
                .status(status.badRequest)
                .send(getResponseStructure(status.badRequest, message.alreadyBooked))
        }
        const findUser = await appointmentSchema.aggregate([{ $match: { user: appointment["user"], appointmentDate: req.body.date, start: req.body.time } }]);
        // finding user if he already booked an appointment on that date.
        if (findUser["length"] > 0) {
            return res
                .status(status.badRequest)
                .send(getResponseStructure(status.badRequest, message.userAlreadyBooked))
        }
        // And finally Update the Appointment Collection including the updated At field.
        await appointmentSchema.findByIdAndUpdate({ _id: appointment["_id"] }, { updatedAt: new Date(), appointmentDate: req.body.date, start: req.body.time });
        return res
            .status(status.success)
            .send(getResponseStructure(status.success, "Appointment" + message.updateSuccess));
    } catch (error) {
        return res
            .status(status.success)
            .send(getResponseStructure(status.notfound, error.toString()));
    }
};