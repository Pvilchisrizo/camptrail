const mongoose = require("mongoose");

const programSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    topic: {
      type: String,
      required: true,
      enum: [
        "Technology",
        "Leadership",
        "Entrepreneurship",
        "Outdoors",
        "Other",
      ],
    },
    ageMin: { type: Number, required: true, min: 5 },
    ageMax: { type: Number, required: true, max: 18 },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be at least 1"],
    },
    status: {
      type: String,
      enum: ["upcoming", "running", "finished"],
      default: "upcoming",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Program", programSchema);
