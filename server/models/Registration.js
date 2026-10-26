const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    child: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Child",
      required: true,
    },
    program: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Program",
      required: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["confirmed", "waitlisted"],
      required: true,
    },
  },
  { timestamps: true }
);

registrationSchema.index({ child: 1, program: 1 }, { unique: true });

module.exports = mongoose.model("Registration", registrationSchema);
