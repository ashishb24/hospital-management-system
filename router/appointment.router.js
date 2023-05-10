import { Router } from 'express';
const router = Router();
import { verifyToken } from "../middleware/middleware"; // Middleware for Token verify and check Admin
import { appointmentRegister, cancel, update } from '../validator/appointment.validator'; // Middleware For user validation 
import { create, getUserAllAppointment, previousAppointment, futureAppointment, cancelAppointment, update as _update } from '../controller/appointment.controller';

export default (router) => {
    router.post('/appointment/register', verifyToken, appointmentRegister, create);
    router.get('/appointment/fetch', verifyToken, getUserAllAppointment);
    router.get('/appointment/previous', verifyToken, previousAppointment);
    router.get('/appointment/future', verifyToken, futureAppointment);
    router.patch('/appointment/cancel', verifyToken, cancel, cancelAppointment);
    router.patch('/appointment/update', verifyToken, update, _update);
    return router;
};