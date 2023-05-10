const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    mobileNumber: {
        type: String,
        unique: true
    },
    otp: {
        type: String,
        default: ""
    },
    confirmation_code_expiry: {
        type: Date,
    },
    gender: {
        type: String,
    },
    role: {
        type: String,
        default: "user"
    },
    dob: {
        type: Date,
    },
    age: {
        type: Number,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: 'not_verified'
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

module.exports = mongoose.model('USER', userSchema);