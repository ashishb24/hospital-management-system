import { Schema, model } from 'mongoose';

const appointmentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "USER"
    },
    bookingId: {
        type: String,
        require: true
    },
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: "DOCTOR"
    },
    start: {
        type: String,
        require: true
    },
    end: {
        type: String,
        require: true
    },
    appointmentDate: {
        type: Date,
        require: true
    },
    meet_link: {
        type: String,
        require: true,
        default: null
    },
    isCancelled: {
        type: Boolean,
        default: false
    },
    isOnline: {
        type: Boolean,
    },
    isBooked: {
        type: Boolean,
        default: true
    },
    isNewPatient: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
},
    {
        timestamps: true
    }
);

export default model('APPOINTMENT', appointmentSchema);