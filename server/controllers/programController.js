const Program = require("../models/Program");

// GET// list of all programs
const getPrograms = async (req, res) => {
  try {
    const programs = await Program.find().sort({ startDate: 1 });
    res.json(programs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//GET//one program
const getProgramById = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }
    res.json(program);
  } catch (error) {
    if (error.name === "CastError") {
      // CastError = the id isn't even a valid MongoDB id format
      //the
      res.status(400).json({ message: "Invalid program id" });
    }
    res.status(500).json({ message: error.message });
  }
};

//POST create a program
const createProgram = async (req, res) => {
  try {
    const program = await Program.create(req.body);
    res.status(201).json(program);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

//PUT update program
const updateProgram = async (req, res) => {
  try {
    const program = await Program.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // to get the new doc
      runValidators: true, //apply schema rules
    });
    if (!program) {
      return res.status(404).json({ message: "Program not found " });
    }
    res.json(program);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid program id" });
    }
    if (error.name === "ValidationError") {
      return res.status(500).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

//DELETE program
const deleteProgram = async (req, res) => {
  try {
    const program = await Program.findByIdAndDelete(req.params.id);
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }
    res.json({ message: "Program deleted" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid program id" });
    }
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPrograms,
  getProgramById,
  createProgram,
  updateProgram,
  deleteProgram,
};
