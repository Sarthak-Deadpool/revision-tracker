/** @format */

const baseTemplate = require("./baseTemplate");

module.exports = (name, otp) =>
  baseTemplate({
    title: "Reset Your Password",

    greeting: `Hello ${name},`,

    subtitle:
      "We received a request to reset your password. Use the verification code below to continue.",

    otp,

    footer:
      "If you didn't request this password reset, simply ignore this email. Your password will remain unchanged.",

    headerColor: "#DC2626",

    otpBackground: "#FEF2F2",

    otpColor: "#DC2626",

    icon: "🔒",
  });
