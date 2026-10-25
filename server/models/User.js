const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: ["parent", "admin"],
      default: "parent",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};
module.exports = mongoose.model("User", userSchema);

// "_id": "6adc2be33c04275def30bddc",
// "name": "Parent",
// "email": "parent@test.com",
// "role": "parent",
// "token": eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhZGMyYmUzM2MwNDI3NWRlZjMwYmRkYyIsImlhdCI6MTc5MjkxNDYwNSwiZXhwIjoxNzkzNTE5NDA1fQ.IPrLQnmLk2ystUbMF0G-fvYAvSiO1MDD5CTaJ2Xqvog

// "_id": "6addac46e0780b95991e88a7",
// "psrent2": "Other Parent",
// "email": "other@test.com",
// "role": "parent",
// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhZGRhYzQ2ZTA3ODBiOTU5OTFlODhhNyIsImlhdCI6MTc5MjkxNDY1MywiZXhwIjoxNzkzNTE5NDUzfQ.7KM6ZacU42soah9ezsFMOotyLFYRaDSKH8itGf3yfWw
// }
