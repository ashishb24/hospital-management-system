const express = require('express');
const router = express.Router();
const { verifyToken } = require("../middleware/middleware"); // Middleware for Token verify and check Admin
const validator = require('../validator/user.validator') // Middleware For user validation
const api = require('../controller/user.controller');

module.exports = (router) => {
    router.post('/user/register', validator.userRegister, api.createUser);
    router.post('/user/register/verify', api.verify);
    router.post('/user/password/forgot', validator.forgotPassword, api.forgotPassword);
    router.post('/user/password/forgot/verify', validator.verifyForgotPassword, api.verifyForgotPassword);
    router.post('/user/login', validator.login, api.login);
    router.post('/user/login/verify', validator.login2FA, api.login2FA);
    router.post('/user/resend', validator.resendCode, api.resendCode);
    router.get('/user/profile', verifyToken, api.getProfile);
    router.patch('/user/update', verifyToken, validator.updateUser, api.updateUser);
    router.post('/user/update/security', verifyToken, api.updateMailAndNumber);
    router.patch('/user/update/security/verify', verifyToken, api.updateMailAndNumberVerify);
    router.post('/user/logout', verifyToken, api.logout);
    router.delete('/user/deactivate', verifyToken, api.deactivate);
    return router;
};