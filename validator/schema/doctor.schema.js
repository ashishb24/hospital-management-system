const Joi = require('joi').extend(require('@joi/date'));   // Validation

exports.register = Joi.object({
    name: Joi.string().lowercase().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } }),
    gender: Joi.string().required().lowercase().valid(...['male', 'female', 'other']),
    dob: Joi.date().format('YYYY-MM-DD').utc(),
    age: Joi.number().integer(),
    specialty: Joi.string().required().lowercase(),
    qualification: Joi.string().required().lowercase(),
    number: Joi.string().min(10).max(10).required(),
    experience: Joi.number().required(),
    fees: Joi.number().required(),
});

// exports.cancel = Joi.object({
//     id: Joi.string().required(),
// });
//
// exports.update = Joi.object({
//     id: Joi.string().required(),
//     time: Joi.string().lowercase().valid(...['morning', 'afternoon', 'evening']),
//     date: Joi.date(),
// }).or("time", "date");