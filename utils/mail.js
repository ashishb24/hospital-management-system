const { response } = require('express');
const axios = require("axios").default;


exports.mailer = async (to, subject, template) => {
    const options = {
        method: 'POST',
        // url: 'http://localhost:3001/mail/time-set', // Local URL
        url: 'https://mail--service.herokuapp.com/mail',  // Cloud URL
        data: { to: to, subject: subject, html: template }
    };
    await axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
        response.send(error);
    });
};

// For schedule the mail...
exports.mail_schedule = async (to, subject, template, minute, hour, day, month) => {
    const options = {
        method: 'POST',
        // url: 'http://localhost:3001/mail/schedule', // Local URL
        url: 'https://mail--service.herokuapp.com/mail/schedule',  // Cloud URL
        data: {
            to: to,
            subject: subject,
            html: template,
            minute: minute,
            hour: hour,
            day: day,
            month: month
        }
    };
    await axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
        response.send(error);
    });
};