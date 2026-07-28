/** @format */

const crypto = require("crypto");

const generateOTP = () => {
  const otp = crypto.randomInt(100000, 1000000).toString();

  const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  return {
    otp,
    hashedOTP,
    expiresAt,
  };
};

module.exports = generateOTP;
