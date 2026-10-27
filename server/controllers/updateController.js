const Update = require("../models/Update");
const Program = require("../models/Program");
const Registration = require("../models/Registration");

//POST updates to a running program

const createUpdate = async (req, res) => {
  try {
    const { programId, message, imageUrl } = req.body;

    const program = await Program.findById(programId);
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }
    //updates only when the camp is happening
    if (program.status !== "running") {
      return res
        .status(400)
        .json({ message: "Updates can only be posted to running programs" });
    }
    const update = await Update.create({
      program: programId,
      author: req.user._id,
      message,
      imageUrl,
    });
    res.status(201).json(update);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid program id" });
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};
//GET parent's feed
const getMyFeed = async (req, res) => {
  try {
    const programIds = await Registration.find({
      parent: req.user._id,
      status: "confirmed",
    }).distinct("program");

    const updates = await Update.find({ program: { $in: programIds } })
      .populate("program", "title")
      .populate("author", "name")
      .sort({ createdAt: -1 });

    res.json(updates);
  } catch (error) {
    req.status(500).json({ message: error.message });
  }
};

//GET admin
const getProgramUpdates = async (req, res) => {
  try {
    const updates = await Update.find({ program: req.params.programId })
      .populate("author", "name")
      .sort({ createAt: -1 });

    res.json(updates);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid program id" });
    }
    res.status(500).json({ message: error.message });
  }
};

//DELETE admin removes an updaye
const deleteUpdate = async (req, res) => {
  try {
    const update = await Update.findByIdAndDelete(req.params.id);
    if (!update) {
      return res.status(400).json({ message: "Update not found" });
    }
    res.json({ message: "Update deleted" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid update id" });
    }
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createUpdate, getMyFeed, getProgramUpdates, deleteUpdate };
