const validate = require('./schema/appointment.schema');

exports.appointmentRegister = (req, res, next) => {  // Middleware
    try {
        const { value, error } = validate.appointmentCreation.validate(req.body);
        if (error) {
            return res.send({ error: error.message.toString() })
        }
        req.body = value;
        next();
    } catch (e) {
        next(e);
    }
};

exports.cancel = (req, res, next) => {  // Middleware
    try {
        const { value, error } = validate.cancel.validate(req.query);
        if (error) {
            return res.send({ error: error.message.toString() })
        }
        req.body = value;
        next();
    } catch (e) {
        next(e);
    }
};
exports.update = (req, res, next) => {  // Middleware
    try {
        const { value, error } = validate.update.validate(req.body);
        if (error) {
            return res.send({ error: error.message.toString() })
        }
        req.body = value;
        next();
    } catch (e) {
        next(e);
    }
};