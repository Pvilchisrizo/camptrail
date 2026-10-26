const express = require("express");
const router = express.Router();
const {
  createRegistration,
  getMyRegistrations,
  cancelRegistration,
  getProgramRoster,
} = require("../controllers/registrationController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.use(protect);

router.route("/").get(getMyRegistrations).post(createRegistration);

router.get("/program/:programId", adminOnly, getProgramRoster);
router.delete("/:id", cancelRegistration);

module.exports = router;
