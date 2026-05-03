const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  seatNumber: { type: String, required: true }, // e.g., "A1", "B5"
  row: { type: String, required: true },
  column: { type: Number, required: true },
  type: { type: String, enum: ['regular', 'premium', 'recliner'], default: 'regular' },
  price: { type: Number, required: true },
  isBooked: { type: Boolean, default: false },
});

const showSchema = new mongoose.Schema(
  {
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    theater: { type: String, required: true },
    screen: { type: String, default: 'Screen 1' },
    date: { type: Date, required: true },
    time: { type: String, required: true }, // e.g., "10:30 AM"
    seats: [seatSchema],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Show', showSchema);
