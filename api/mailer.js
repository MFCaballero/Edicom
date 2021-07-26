var nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user:'edicomb84@gmail.com',
        pass:'qvrzsisipnqoqjbq',
    },
    debug:false,
    tls: {
        rejectUnauthorized: false
    } 
})
module.exports = { transporter };