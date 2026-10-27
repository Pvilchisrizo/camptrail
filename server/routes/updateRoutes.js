const express = require("express");
const router = express.Router();

const {
  createUpdate,
  getMyFeed,
  getProgramUpdates,
  deleteUpdate,
} = require("../controllers/updateController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.use(protect); //must be logged in user

router.route("/").get(getMyFeed).post(adminOnly, createUpdate);

router.get("/program/:programId", adminOnly, getProgramUpdates);
router.delete("/:id", adminOnly, deleteUpdate);

module.exports = router;
