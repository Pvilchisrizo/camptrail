const express = require("express");
const router = express.Router();

const {
  getMyChildren,
  createChild,
  updateChild,
  deleteChild,
} = require("../controllers/childController");

const { protect } = require("../middleware/authMiddleware");

router.use(protect);

router.route("/").get(getMyChildren).post(createChild);

router.route("/:id").put(updateChild).delete(deleteChild);

module.exports = router;
// Adding children is a parent feature - Admins will see the children in the program rosters.
