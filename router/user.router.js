import { Router } from 'express';
const router = Router();
import { verifyToken } from "../middleware/middleware"; // Middleware for Token verify and check Admin
import { userRegister, forgotPassword, verifyForgotPassword, login, login2FA, resendCode, updateUser } from '../validator/user.validator'; // Middleware For user validation
import { createUser, verify, forgotPassword as _forgotPassword, verifyForgotPassword as _verifyForgotPassword, login as _login, login2FA as _login2FA, resendCode as _resendCode, getProfile, updateUser as _updateUser, updateMailAndNumber, updateMailAndNumberVerify, logout, deactivate } from '../controller/user.controller';

export default (router) => {
    router.post('/user/register', userRegister, createUser);
    router.post('/user/register/verify', verify);
    router.post('/user/password/forgot', forgotPassword, _forgotPassword);
    router.post('/user/password/forgot/verify', verifyForgotPassword, _verifyForgotPassword);
    router.post('/user/login', login, _login);
    router.post('/user/login/verify', login2FA, _login2FA);
    router.post('/user/resend', resendCode, _resendCode);
    router.get('/user/profile', verifyToken, getProfile);
    router.patch('/user/update', verifyToken, updateUser, _updateUser);
    router.post('/user/update/security', verifyToken, updateMailAndNumber);
    router.patch('/user/update/security/verify', verifyToken, updateMailAndNumberVerify);
    router.post('/user/logout', verifyToken, logout);
    router.delete('/user/deactivate', verifyToken, deactivate);
    return router;
};