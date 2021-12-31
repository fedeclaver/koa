const nodemailer = require('nodemailer');
const config = require('../config/config');

const transporterGmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.user,
        pass: config.pass
    }
});

module.exports = transporterGmail;