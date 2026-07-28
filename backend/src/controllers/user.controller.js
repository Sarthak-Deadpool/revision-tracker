/** @format */

const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const generateOTP = require("../utils/generateOTP.util");
const sendEmail = require("../utils/sendEmail.util");
const verificationEmail = require("../templates/verificationEmail");

const {
  uploadToCloudinary,
  deleteFromCloudinary,
} = require("../utils/cloudinary.util");
const { sendMail } = require("../config/mail");

// this function register user in database

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const trimmedName = name?.trim();
    const normalizedEmail = email?.trim().toLowerCase();

    if (!trimmedName || !normalizedEmail || !password) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    if (trimmedName.length < 2) {
      return res.status(400).json({
        message: "Name must be at least 2 characters long.",
      });
    }

    if (trimmedName.length > 30) {
      return res.status(400).json({
        message: "Name cannot exceed 30 characters.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        message: "Please provide a valid email address.",
      });
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d@$!%*?&^#()_+\-=\[\]{};':"\\|,.<>\/?]{8,20}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be 8-20 characters long and include uppercase, lowercase, number, and special character.",
      });
    }

    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const { otp, hashedOTP, expiresAt } = generateOTP();

    const user = await User.create({
      name: trimmedName,
      email: normalizedEmail,
      password: hashedPassword,
      verificationOTP: hashedOTP,
      verificationOTPExpires: expiresAt,
    });

    await sendEmail({
      to: user.email,
      subject: "Verify Your Email",
      html: verificationEmail(user.name, otp),
    });

    return res.status(201).json({
      message: "User Registered successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// this function login user

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      return res.status(400).json({
        message: "Email and Password are required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        message: "Please provide a valid email address.",
      });
    }

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message:
          "Email is not verified. Please verify your email before logging in.",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// verify Email

const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const normalizedEmail = email?.trim().toLowerCase();

    if (!normalizedEmail || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required",
      });
    }

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: "Email is already verified.",
      });
    }

    if (!user.verificationOTP || !user.verificationOTPExpires) {
      return res.status(400).json({
        message: "No verification OTP found. Please request a new OTP.",
      });
    }

    if (user.verificationOTPExpires < new Date()) {
      return res.status(400).json({
        message: "OTP has expired. Please request a new OTP",
      });
    }

    const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

    if (hashedOTP !== user.verificationOTP) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    user.isVerified = true;
    user.verificationOTP = null;
    user.verificationOTPExpires = null;

    await user.save();

    return res.status(200).json({
      message: "Email verified successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//resend otp

const resendVerificationOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const normalizedEmail = email?.trim().toLowerCase();

    if (!normalizedEmail) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: "Email is already verified.",
      });
    }

    const { otp, hashedOTP, expiresAt } = generateOTP();

    user.verificationOTP = hashedOTP;
    user.verificationOTPExpires = expiresAt;

    await user.save();

    await sendEmail({
      to: user.email,
      subject: "Verify Your Email",
      html: verificationEmail(user.name, otp),
    });

    return res.status(200).json({
      message: "Verification OTP sent successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// forget password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const normalizedEmail = email?.trim().toLowerCase();

    if (!normalizedEmail) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        message: "Please provide a valid email address",
      });
    }

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        message: "Please verify your email first",
      });
    }

    const { otp, hashedOTP, expiresAt } = generateOTP();

    user.passwordResetOTP = hashedOTP;
    user.passwordResetOTPExpires = expiresAt;

    await user.save();

    await sendEmail({
      to: user.email,
      subject: "Reset Your Password",
      html: verificationEmail(user.name, otp),
    });

    return res.status(200).json({
      message: "Password reset OTP sent successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// verify reset otp
const verifyResetOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const normalizedEmail = email?.trim().toLowerCase();

    if (!normalizedEmail || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        message: "Please provide a valid email address.",
      });
    }

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    if (!user.passwordResetOTP || !user.passwordResetOTPExpires) {
      return res.status(400).json({
        message: "No password reset OTP found. Please request a new OTP.",
      });
    }

    if (user.passwordResetOTPExpires < new Date()) {
      return res.status(400).json({
        message: "Password reset OTP has expired. Please request a new OTP.",
      });
    }

    const crypto = require("crypto");

    const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

    if (hashedOTP !== user.passwordResetOTP) {
      return res.status(400).json({
        message: "Invalid OTP.",
      });
    }

    return res.status(200).json({
      message: "OTP verified successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//reset password
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const normalizedEmail = email?.trim().toLowerCase();

    if (!normalizedEmail || !otp || !newPassword) {
      return res.status(400).json({
        message: "Email, OTP and new password are required.",
      });
    }

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    if (!user.passwordResetOTP || !user.passwordResetOTPExpires) {
      return res.status(400).json({
        message: "No password reset OTP found. Please request a new OTP.",
      });
    }

    if (user.passwordResetOTPExpires < new Date()) {
      return res.status(400).json({
        message: "Password reset OTP has expired. Please request a new OTP.",
      });
    }

    const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

    if (hashedOTP !== user.passwordResetOTP) {
      return res.status(400).json({
        message: "Invalid OTP.",
      });
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d@$!%*?&^#()_+\-=\[\]{};':"\\|,.<>\/?]{8,20}$/;

    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        message:
          "Password must be 8-20 characters long and include uppercase, lowercase, number, and special character.",
      });
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password);

    if (isSamePassword) {
      return res.status(400).json({
        message: "New password must be different from the current password.",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    user.passwordResetOTP = null;
    user.passwordResetOTPExpires = null;

    await user.save();

    return res.status(200).json({
      message: "Password reset successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// this used for getting user profile

const getProfile = async (req, res) => {
  try {
    return res.status(200).json({
      message: "Profile fetched successfully",
      user: req.user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// updateProfile

const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;
    const avatarFile = req.file;

    if (Object.keys(req.body).length === 0 && !req.file) {
      return res.status(400).json({
        message: "At least one field is required to update the profile.",
      });
    }

    const allowedFields = ["name"];
    const receivedFields = Object.keys(req.body);

    const isValidOperation = receivedFields.every((field) =>
      allowedFields.includes(field),
    );

    if (!isValidOperation) {
      return res.status(400).json({
        message: "Invalid fields provided",
      });
    }

    if (name !== undefined) {
      const trimmedName = name.trim();

      if (!trimmedName) {
        return res.status(400).json({
          message: "Name is required",
        });
      }

      if (trimmedName.length < 2) {
        return res.status(400).json({
          message: "Name must be at least 3 characters long",
        });
      }

      if (trimmedName.length > 30) {
        return res.status(400).json({
          message: "Name cannot exceed 50 characters",
        });
      }
    }

    if (name !== undefined) {
      req.user.name = name.trim();
    }
    if (avatarFile) {
      if (req.user.avatarPublicId) {
        await deleteFromCloudinary(req.user.avatarPublicId);
      }

      const uploadedAvatar = await uploadToCloudinary(
        avatarFile.buffer,
        "revision-tracker/avatars",
      );

      req.user.avatar = uploadedAvatar.secure_url;
      req.user.avatarPublicId = uploadedAvatar.public_id;
    }

    await req.user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar,
        streak: req.user.streak,
        longestStreak: req.user.longestStreak,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Current password and new password are required",
      });
    }
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Current password is incorrect",
      });
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password);

    if (isSamePassword) {
      return res.status(400).json({
        message: "New password must be different from the current password",
      });
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d@$!%*?&^#()_+\-=\[\]{};':"\\|,.<>\/?]{8,20}$/;

    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        message:
          "Password must be 8-20 characters long and include uppercase, lowercase, number, and special character.",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyEmail,
  resendVerificationOTP,
  forgotPassword,
  verifyResetOTP,
  resetPassword,
  getProfile,
  updateProfile,
  changePassword,
};
