/** @format */

const baseTemplate = require("./baseTemplate");

module.exports = (name, otp) =>
  baseTemplate({
    title: "Verify Your Email",

    greeting: `Hello ${name},`,

    subtitle:
      "Welcome to Revision Tracker! Please verify your email address using the code below.",

    otp,

    footer:
      "If you didn't create an account, you can safely ignore this email.",

    headerColor: "#F97316",

    otpBackground: "#FFF7ED",

    otpColor: "#EA580C",

    icon: "📧",
  });
