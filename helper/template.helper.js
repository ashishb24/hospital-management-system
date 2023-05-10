let {
    signup,
    login,
    forgotPass,
    resend,
    update,
    booked,
    schedule,
} = require("../utils/template.utils")

exports.signup = (name, otp) => {
    const obj = {
        name: name.toUpperCase(),
        otp
    };
    for (const value in obj) {
        signup = signup.replace("#var", obj[value])
    }
    return signup;
}

exports.login = (name, otp) => {
    const obj = {
        name: name.toUpperCase(),
        otp
    };
    for (const value in obj) {
        login = login.replace("#var", obj[value])
    }
    return login;
}

exports.resend = (name, otp) => {
    const obj = {
        name: name.toUpperCase(),
        otp
    };
    for (const value in obj) {
        resend = resend.replace("#var", obj[value])
    }
    return resend;
}

exports.update = (name, otp) => {
    const obj = {
        name: name.toUpperCase(),
        otp
    };
    for (const value in obj) {
        update = update.replace("#var", obj[value])
    }
    return update;
}

exports.forgotPass = (name, otp) => {
    const obj = {
        name: name.toUpperCase(),
        otp
    };
    for (const value in obj) {
        forgotPass = forgotPass.replace("#var", obj[value])
    }
    return forgotPass;
}

exports.create = (name, bookingId, date, start, end, doctor) => {
    let d = (date + '').split(' ');
    d[2] = d[2] + ',';
    let obj = {
        name: name.toUpperCase(),
        doctor,
        bookingId,
        date: [d[0], d[1], d[2], d[3]].join(' '), // get format like: (Sun May 11, 2014)
        start,
        end,

    }
    for (const value in obj) {
        booked = booked.replace("#var", obj[value])
    }
    return booked;
}

exports.schedule = (name, link) => {
    let obj = {
        name: name.toUpperCase(),
        link,
    }
    for (const value in obj) {
        schedule = schedule.replace("#var", obj[value])
    }
    return schedule;
}
