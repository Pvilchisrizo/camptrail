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
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Admin access only" });
};

module.exports = { protect, adminOnly };

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhZGJlMTMwMzdhZTE2OGUwNjcxMjRjNCIsImlhdCI6MTc5MjgxMzMwMSwiZXhwIjoxNzkzNDE4MTAxfQ.e2xpMYPQJBdiqL70YM58ym2O7xHepd6q36pK9lFwQew
//password123456

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhZGMyYmUzM2MwNDI3NWRlZjMwYmRkYyIsImlhdCI6MTc5MjgxNDA1MSwiZXhwIjoxNzkzNDE4ODUxfQ.08STbuER-xCcjZpvH9bqOggcnu_W23_f7rGPHI5bktI

// 400
// {
//   "message": "Program validation failed: topic: `Leadership` is not a valid enum value for path `topic`."
// }

//"_id": "6adc41793fb1054ec57a237f"
