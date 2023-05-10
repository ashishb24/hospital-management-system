const jwt = require('jsonwebtoken');

exports.getJWTToken = (json) => {
    return jwt.sign(json, process.env.JWT_SECRET_KEY);  // Collection
};  // sign ===> Encrypt

exports.getObjectFromJWT = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
};  // verify ==> Decrypt