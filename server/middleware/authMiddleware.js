const jwt = require("jsonwebtoken");
const User = require("../models/User");

//Request has a valid token?

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Not authorized, user not found" });
    }
    req.user = user;

    next();
  } catch (error) {
    const message =
      error.name === "TokenExpiredError"
        ? "Session expired, please log in again"
        : "Not authorized, invalid token";
    return res.status(401).json({ message });
  }
};

//Checks if the user is an admin
const adminOnly = (req, res, next) => {
  console.log("adminOnly: role is", req.user && req.user.role);
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Admin access only" });
};

module.exports = { protect, adminOnly };
