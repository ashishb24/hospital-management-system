const Joi = require('joi').extend(require('@joi/date'));  // Validation

exports.userCreation = Joi.object({
    name: Joi.string().lowercase().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } }),
    gender: Joi.string().required().lowercase().valid(...['male', 'female', 'other']),
    mobileNumber: Joi.string().min(10).max(10).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirmPass: Joi.ref('password'),
    dob: Joi.date().format('YYYY-MM-DD').utc(),
    age: Joi.number().integer(),
    role: Joi.string().valid(...['user', 'admin']),
    status: Joi.string().valid(...['not_verified', 'verified']),
});

exports.forgotPassword = Joi.object({
    email: Joi.string().required().lowercase(),
});

exports.verifyForgotPassword = Joi.object({
    email: Joi.string().required().lowercase(),
    otp: Joi.string().required(),
    newPassword: Joi.string().required(),
    confirmPassword: Joi.string().required(),
});

exports.login = Joi.object({
    email: Joi.string().lowercase().required(),
    password: Joi.string().required()
});

exports.login2FA = Joi.object({
    email: Joi.string().lowercase().required(),
    otp: Joi.string().required()
});

exports.codeResend = Joi.object({
    email: Joi.string().lowercase().required(),
});

exports.updateUser = Joi.object({
    name: Joi.string(),
    dob: Joi.date().format('YYYY-MM-DD').utc()
});

exports.updateMail = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    mobileNumber: Joi.string().min(10).max(10).required(),
}).or("email", "mobileNumber")