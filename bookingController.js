const Booking = require('../models/Booking');
const Show = require('../models/Show');

// @desc    Create booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
  try {
    const { showId, selectedSeats } = req.body;

    const show = await Show.findById(showId);
    if (!show) return res.status(404).json({ message: 'Show not found' });

    // Validate seats are available
    const unavailable = [];
    for (const seatNum of selectedSeats) {
      const seat = show.seats.find((s) => s.seatNumber === seatNum);
      if (!seat || seat.isBooked) unavailable.push(seatNum);
    }
    if (unavailable.length > 0) {
      return res.status(400).json({ message: `Seats already booked: ${unavailable.join(', ')}` });
    }

    // Mark seats as booked
    let totalAmount = 0;
    const bookedSeatsInfo = [];

    show.seats.forEach((seat) => {
      if (selectedSeats.includes(seat.seatNumber)) {
        seat.isBooked = true;
        totalAmount += seat.price;
        bookedSeatsInfo.push({ seatNumber: seat.seatNumber, type: seat.type, price: seat.price });
      }
    });

    await show.save();

    const booking = await Booking.create({
      user: req.user._id,
      show: showId,
      movie: show.movie,
      seats: bookedSeatsInfo,
      totalAmount,
    });

    await booking.populate('show movie');
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user bookings
// @route   GET /api/bookings/my
// @access  Private
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('movie', 'title poster')
      .populate('show', 'date time theater')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all bookings (Admin)
// @route   GET /api/bookings
// @access  Admin
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .populate('movie', 'title')
      .populate('show', 'date time theater')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Free up seats
    const show = await Show.findById(booking.show);
    if (show) {
      show.seats.forEach((seat) => {
        if (booking.seats.find((s) => s.seatNumber === seat.seatNumber)) {
          seat.isBooked = false;
        }
      });
      await show.save();
    }

    booking.status = 'cancelled';
    booking.paymentStatus = 'refunded';
    await booking.save();

    res.json({ message: 'Booking cancelled', booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createBooking, getMyBookings, getAllBookings, cancelBooking };
