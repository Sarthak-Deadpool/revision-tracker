/** @format */

const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Unauthorized and No token found",
    });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decode.id).select("-password");

    req.user = user
    next();

  } catch (error) {
    console.error(error);
    return res.status(401).json({
        message:"invalid token"
    })
  }
};

module.exports = { protect };
