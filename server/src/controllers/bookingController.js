const Booking = require("../models/Booking");
const Expert = require("../models/Expert");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

exports.createBooking = asyncHandler(async (req, res) => {
  const { expertId, name, email, phone, date, timeSlot, notes } = req.body;

  const expert = await Expert.findById(expertId);
  if (!expert) throw new AppError("Expert not found", 404);

  // Check date availability
  const dateEntry = expert.availableSlots.find((s) => s.date === date);
  if (!dateEntry) throw new AppError("Selected date is not available for this expert", 400);

  // Check slot availability
  if (!dateEntry.slots.includes(timeSlot)) {
    throw new AppError("Selected time slot is not available", 400);
  }

  // Create booking
  const booking = await Booking.create({
    expert: expertId, name, email, phone, date, timeSlot, notes,
  });

  // Remove booked slot
  await Expert.updateOne(
    { _id: expertId, "availableSlots.date": date },
    { $pull: { "availableSlots.$.slots": timeSlot } }
  );

  // Real-time update
  req.app.get("io").emit("slotBooked", { expertId, date, timeSlot });

  res.status(201).json({ message: "Booking successful", booking });
});

exports.getBookingsByEmail = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ email: req.query.email })
    .populate("expert", "name category");
  res.json(bookings);
});

exports.updateBookingStatus = asyncHandler(async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  if (!booking) throw new AppError("Booking not found", 404);
  res.json({ message: "Status updated", booking });
});