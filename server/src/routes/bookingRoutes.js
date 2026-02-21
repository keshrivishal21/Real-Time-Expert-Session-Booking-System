const express = require("express");
const router = express.Router();
const {
  createBooking,
  getBookingsByEmail,
  updateBookingStatus,
} = require("../controllers/bookingController");
const {
  bookingValidation,
  emailQueryValidation,
  statusValidation,
} = require("../middlewares/validateMiddleware");

router.post("/", bookingValidation, createBooking);
router.get("/", emailQueryValidation, getBookingsByEmail);
router.patch("/:id/status", statusValidation, updateBookingStatus);

module.exports = router;