const Joi = require('joi');   // Validation

exports.appointmentCreation = Joi.object({
    time: Joi.string().required().lowercase().valid(...['morning', 'afternoon', 'evening']),
    date: Joi.date().required(),
    isOnline: Joi.boolean().required(),
    doctorId: Joi.string().required(),
});

exports.cancel = Joi.object({
    id: Joi.string().required(),
});

exports.update = Joi.object({
    id: Joi.string().required(),
    time: Joi.string().lowercase().valid(...['morning', 'afternoon', 'evening']),
    date: Joi.date(),
}).or("time", "date");