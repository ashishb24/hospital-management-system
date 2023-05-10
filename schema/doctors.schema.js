const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    dob: {
        type: Date,
    },
    age: {
        type: Number,
    },
    specialty: {
        type: String,
        require: true
    },
    qualification: {
        type: String,
        require: true
    },
    contact_number: {
        type: String,
        require: true
    },
    patients: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "USER",
        require: true,
        default: []
    },
    experience: {
        type: String,
    },
    fees: {
        type: String,
    },
    isAvailable: {
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

module.exports = mongoose.model('DOCTOR', doctorSchema);