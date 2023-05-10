const crypto = require('crypto');

exports.md5 = (txt) =>
    crypto.createHash('md5').update(txt).digest('hex');

exports.httpResponse = {
    badRequest: ({ message, data }) => {
        return {
            statusCode: 400,
            message: message || 'Bad request payload',
            data,
        };
    },
    forbidden: ({ message, data }) => {
        return {
            statusCode: 403,
            message: message || 'Forbidden',
            data: data,
        };
    },
    notFound: ({ message }) => {
        return {
            statusCode: 404,
            message: message || 'Not found',
        };
    },
    serverError: ({ message }) => {
        return {
            statusCode: 500,
            message: message || 'An internal error has occurred',
        };
    },
    ok: ({ message, data }) => {
        return {
            statusCode: 200,
            message: message || 'Success',
            data,
        };
    },
    created: ({ message, data }) => {
        return {
            statusCode: 201,
            message: message || 'Created successfully',
            data,
        };
    },
};

// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript#1349426
exports.randomString = (length = 6) => {
    return Math.random().toString(36).substr(2, length); // 2si6m
};

// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
exports.randomNumber = (min = 10000, max = 99999) => {
    return Math.floor(Math.random() * (max - min + 1)) + min; // 98390 - default 5 digit
};


exports.status = {
    success: 200,
    successCreated: 201,
    accepted: 202,
    successNoRecords: 204,
    badRequest: 400, // if parameter missing
    unauthenticated: 401, // if token is invalid
    unauthorized: 403, // if token is invalid
    conflict: 409, // when user already exist.
    unsupportedMediaType: 422,
    sessionExpired: 440, // if the token is expired
    internalServerError: 500,
    notfound: 404,
    gone: 410,
    notAllow: 405
};

exports.message = {
    tokenMissing: "TOKEN MISSING",
    badRequest: "Bad Request payload",
    otpSend: " created successfully. Registration code has been sent via email.",
    codeSent: "Verification code has been sent to ",
    alreadyExist: " Already Exist.",
    notFound: " Not Found.",
    codeExpire: " Verification code has been expired.",
    verifiedSuccess: " Verified Successfully!",
    otpNotMatch: "OTP Not Match!",
    notMatchPassword: "Password Not Match.",
    tryAnotherPassword: "This password was previously set. Please choose a new one.",
    passwordChangeSuccess: "Your password change Successfully.",
    tokenGenerateSuccess: " Token has been generated Successfully.",
    updateSuccess: " Updated Successfully.",
    success: "Appointment Created Successfully, appointment ID has been successfully sent to ",
    somethingWrong: "Something Went Wrong!",
    dateLessThan: "Please select valid date.",
    alreadyBooked: "Slot is Already Booked Please Try Another Available Slot.",
    userAlreadyBooked: "You already booked an appointment for this date please select another date.",
    numberError: "Please provide valid number",
    isHoliday: "Sorry, It's our Holiday",
    unauthorized: "Unauthorized User.",
    deactivatedSuccess: "Account Has Been Deactivated Successfully.",
    availableTimeSlot: "Please Select Available Time Slot.",
    cancelled: "Appointment Cancelled Successfully.",
    successCreated: "Created Successfully.",
    succeed: "Success.",
}