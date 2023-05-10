const validate = require('./schema/user.schema');

exports.userRegister = (req, res, next) => {  // Middleware
    try {
        const { value, error } = validate.userCreation.validate(req.body);
        if (error) {
            return res.send({ error: error.message.toString() })
        }
        req.body = value;
        next();
    } catch (e) {
        next(e);
    }
};

exports.forgotPassword = (req, res, next) => {  // Middleware
    try {
        const { value, error } = validate.forgotPassword.validate(req.body);
        if (error) {
            return res.send({ error: error.message.toString() })
        }
        req.body = value;
        next();
    } catch (e) {
        next(e);
    }
};

exports.verifyForgotPassword = (req, res, next) => {  // Middleware
    try {
        const { value, error } = validate.verifyForgotPassword.validate(req.body);
        if (error) {
            return res.send({ error: error.message.toString() })
        }
        req.body = value;
        next();
    } catch (e) {
        next(e);
    }
};

exports.login = (req, res, next) => {  // Middleware
    try {
        const { value, error } = validate.login.validate(req.body);
        if (error) {
            return res.send({ error: error.message.toString() })
        }
        req.body = value;
        next();
    } catch (e) {
        next(e);
    }
};

exports.login2FA = (req, res, next) => {  // Middleware
    try {
        const { value, error } = validate.login2FA.validate(req.body);
        if (error) {
            return res.send({ error: error.message.toString() })
        }
        req.body = value;
        next();
    } catch (e) {
        next(e);
    }
};

exports.resendCode = (req, res, next) => {  // Middleware
    try {
        const { value, error } = validate.codeResend.validate(req.body);
        if (error) {
            return res.send({ error: error.message.toString() })
        }
        req.body = value;
        next();
    } catch (e) {
        next(e);
    }
};

exports.getOneUser = (req, res, next) => {  // Middleware
    try {
        const { value, error } = validate.getOneUser.validate(req.params);
        if (error) {
            return res.send({ error: error.message.toString() })
        }
        req.body = value;
        next();
    } catch (e) {
        next(e);
    }
};

exports.updateUser = (req, res, next) => {  // Middleware
    try {
        const { value, error } = validate.updateUser.validate(req.body);
        if (error) {
            return res.send({ error: error.message.toString() })
        }
        req.body = value;
        next();
    } catch (e) {
        next(e);
    }
};