const nodemailer = require("nodemailer");

const transporter = require("../config/mail");

const sendEmail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: `"Revision Tracker" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;