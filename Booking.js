const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    show: { type: mongoose.Schema.Types.ObjectId, ref: 'Show', required: true },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    seats: [
      {
        seatNumber: { type: String },
        type: { type: String },
        price: { type: Number },
      },
    ],
    totalAmount: { type: Number, required: true },
    bookingId: { type: String, unique: true },
    status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' },
    paymentStatus: { type: String, enum: ['paid', 'pending', 'refunded'], default: 'paid' },
  },
  { timestamps: true }
);

// Generate booking ID before save
bookingSchema.pre('save', function (next) {
  if (!this.bookingId) {
    this.bookingId = 'MC' + Date.now() + Math.random().toString(36).substr(2, 4).toUpperCase();
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
