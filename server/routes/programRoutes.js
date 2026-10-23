const express = require("express");
const router = express.Router();

const {
  getPrograms,
  getProgramById,
  updateProgram,
  createProgram,
  deleteProgram,
} = require("../controllers/programController");

//groups the methods that share a URL
router.route("/").get(getPrograms).post(createProgram);

router
  .route("/:id")
  .get(getProgramById)
  .put(updateProgram)
  .delete(deleteProgram);

module.exports = router;
