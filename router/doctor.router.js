const express = require('express');
const router = express.Router();
const validator = require('../validator/doctor.validator') // Middleware For user validation
const api = require('../controller/doctor.controller');

module.exports = (router) => {
    router.post('/doctor/register', validator.register, api.register);
    return router;
};