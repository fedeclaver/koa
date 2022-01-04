const nodemailer = require('nodemailer');
const config = require('../config/config');

const transporterGmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.gmail.user,
        pass: config.gmail.pass
    }
});

module.exports = transporterGmail;