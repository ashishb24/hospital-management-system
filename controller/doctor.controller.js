let doctorSchema = require('../../schema/doctors.schema');
let { status, message } = require('../../validator/utils');
let { getResponseStructure } = require('../../constants/response.structure');
let { getAge } = require('../../utils/utils');


exports.register = async (req, res) => {
    try {
        const doctor = new doctorSchema({
            name: req.body.name,
            email: req.body.email,
            dob: req.body.dob,
            age: getAge(req.body.dob),
            specialty: req.body.specialty,
            qualification: req.body.qualification,
            contact_number: '+91' + req.body.number,
            experience: req.body.experience + ' Years',
            fees: '₹' + req.body.fees,
        });
        if (req.body.number.length !== 10) {
            return res
                .status(status.conflict)
                .send(getResponseStructure(status.conflict, message.numberError));
        }
        const find = await doctorSchema.findOne({ $or: [{ email: doctor['email'] }, { contact_number: doctor['contact_number'] }] });
        if (find) {
            return res
                .status(status.conflict)
                .send(getResponseStructure(status.conflict, "Doctor" + message.alreadyExist));
        }
        await doctor.save()
            .then(() => {
                return res
                    .status(status.successCreated)
                    .send(getResponseStructure(status.successCreated, message.successCreated));
            })
            .catch(() => {
                return res
                    .status(status.badRequest)
                    .send(getResponseStructure(status.badRequest, message.badRequest));
            });
    } catch (error) {
        return res
            .status(status.success)
            .send(getResponseStructure(status.notfound, error.toString()));
    }
};
