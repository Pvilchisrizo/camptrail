const mongoose = require("mongoose");

const childSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is requiered"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is requiered"],
      trim: true,
    },
    birthDate: {
      type: Date,
      required: [true, "Birth date is requiered"],
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //user
      requiered: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Child", childSchema);
