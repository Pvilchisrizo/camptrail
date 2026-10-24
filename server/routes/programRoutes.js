const express = require("express");
const router = express.Router();

const {
  getPrograms,
  getProgramById,
  updateProgram,
  createProgram,
  deleteProgram,
} = require("../controllers/programController");

const { protect, adminOnly } = require("../middleware/authMiddleware");
//groups the methods that share a URL
router
  .route("/")
  .get(getPrograms) //public
  .post(protect, adminOnly, createProgram); //admins only

router
  .route("/:id")
  .get(getProgramById) //public
  .put(protect, adminOnly, updateProgram) //admin only
  .delete(protect, adminOnly, deleteProgram); //admin only

module.exports = router;

//Note: Browsing stays public so parents can see the programs before creating an account
