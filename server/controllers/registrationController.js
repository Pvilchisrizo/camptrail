const Registration = require("../models/Registration");
const Child = require("../models/Child");
const Program = require("../models/Program");

//how old will the child be on a given date
const ageOn = (birthDate, date) => {
  let age = date.getUTCFullYear() - birthDate.getUTCFullYear();
  const hadBirthday =
    date.getUTCMonth() > birthDate.getUTCMonth() ||
    (date.getUTCMonth() === birthDate.getUTCMonth() &&
      date.getUTCDate() >= birthDate.getUTCDate());

  if (!hadBirthday) age--;
  return age;
};

//POST /registration, register a child to a program

const createRegistration = async (req, res) => {
  try {
    const { childId, programId } = req.body;
    //the child must belong to the logged-in parent
    const child = await Child.findOne({ _id: childId, parent: req.user._id });
    if (!child) {
      return res.status(404).json({ message: "Child not found" });
    }

    //the program should exist
    const program = await Program.findById(programId);
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }
    //only upcoming programs will accept registration
    if (program.status !== "upcoming") {
      return res
        .status(404)
        .json({ message: "Registration for this program is closed " });
    }
    const age = ageOn(child.birthDate, program.startDate);
    if (age < program.ageMin || age > program.ageMax) {
      return res.status(400).json({
        message: `This program is for ages ${program.ageMin} to ${program.ageMax} to ${program.ageMax}. ${child.firstName} will be ${age}`,
      });
    }
    const existing = await Registration.findOne({
      child: childId,
      program: programId,
    });
    if (existing) {
      return res.status(400).json({
        message: `${child.firstName} is already registered for this program`,
      });
    }
    const confirmedCount = await Registration.countDocuments({
      program: programId,
      status: "confirmed",
    });
    const status =
      confirmedCount < program.capacity ? "confirmed" : "waitlisted";
    const registration = await Registration.create({
      child: childId,
      program: programId,
      parent: req.user._id,
      status,
    });
    res.status(201).json(registration);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid child or program id" });
    }
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "already registered fot the program" });
    }
    res.status(500).json({ message: error.message });
  }
};

//GET child and program details

const getMyRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({ parent: req.user._id })
      .populate("child", "firstName lastName")
      .populate("program", "title startDate endDate status")
      .sort({ createAt: -1 }); //newest first
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//DELETE
const cancelRegistration = async (req, res) => {
  try {
    const registrations = await Registration.findOneAndDelete({
      _id: req.params.id,
      parent: req.user._id,
    });
    if (!registrations) {
      return res.status(404).json({ message: "Registration not found" });
    }
    res.json({ message: "Registration cancelled" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid registration id" });
    }
    res.status(500).json({ message: error.message });
  }
};

//GET roster (admin only)
const getProgramRoster = async (req, res) => {
  try {
    const roster = await Registration.find({ program: req.params.programId })
      .populate("child", "firstName lastName birthDate")
      .populate("parent", "name email")
      .sort({ status: 1, createdAt: 1 });

    res.json(roster);
  } catch (error) {
    if (error.name === "CastError")
      return res.status(400).json({ message: "Invalid program id" });
  }
};

module.exports = {
  createRegistration,
  getMyRegistrations,
  cancelRegistration,
  getProgramRoster,
};
