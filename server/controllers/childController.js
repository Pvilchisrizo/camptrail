const Child = require("../models/Child");

//GET
const getMyChildren = async (req, res) => {
  try {
    const children = await Child.find({ parent: req.user._id }).sort({
      firstName: 1,
    });
    res.json(children);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//POST
const createChild = async (req, res) => {
  try {
    const { firstName, lastName, birthDate } = req.body;
    const child = await Child.create({
      firstName,
      lastName,
      birthDate,
      parent: req.user._id,
    });
    res.status(201).json({ child });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

//PUT
const updateChild = async (req, res) => {
  try {
    const { firstName, lastName, birthDate } = req.body;

    const child = await Child.findOneAndUpdate(
      { _id: req.params.id, parent: req.user._id }, //parent: req.user._id added so get this child but only if its the parents child
      { firstName, lastName, birthDate },
      { new: true, runValidators: true }
    );
    if (!child) {
      return res.status(404).json({ message: "Child not found" });
    }
    res.json(child);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid child id" });
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

//DELETE
const deleteChild = async (req, res) => {
  try {
    const child = await Child.findOneAndDelete({
      _id: req.params.id,
      parent: req.user._id,
    });
    if (!child) {
      return res.status(404).json({ message: "Child not found" });
    }
    res.json({ message: "Child removed" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid child id" });
    }
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMyChildren, createChild, updateChild, deleteChild };
