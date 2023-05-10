const validate = require('./schema/doctor.schema');

exports.register = (req, res, next) => {  // Middleware
    try {
        const { value, error } = validate.register.validate(req.body);
        if (error) {
            return res.send({ error: error.message.toString() })
        }
        req.body = value;
        next();
    } catch (e) {
        next(e);
    }
};