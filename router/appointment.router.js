const express = require('express');
const router = express.Router();
const { verifyToken } = require("../middleware/middleware"); // Middleware for Token verify and check Admin
const validator = require('../validator/appointment.validator') // Middleware For user validation 
const api = require('../controller/appointment.controller');

module.exports = (router) => {
    router.post('/appointment/register', verifyToken, validator.appointmentRegister, api.create);
    router.get('/appointment/fetch', verifyToken, api.getUserAllAppointment);
    router.get('/appointment/previous', verifyToken, api.previousAppointment);
    router.get('/appointment/future', verifyToken, api.futureAppointment);
    router.patch('/appointment/cancel', verifyToken, validator.cancel, api.cancelAppointment);
    router.patch('/appointment/update', verifyToken, validator.update, api.update);
    return router;
};