const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  slots: [
    {
      type: String,
      required: true
    }
  ]
});

const expertSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    experience: {
      type: Number,
      required: true
    },
    rating: {
      type: Number,
      default: 0
    },
    availableSlots: [slotSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expert", expertSchema);