const User = require('../models/User');
const Movie = require('../models/Movie');
const Show = require('../models/Show');
const Booking = require('../models/Booking');

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Admin
const getDashboardStats = async (req, res) => {
  try {
    const totalMovies = await Movie.countDocuments();
    const totalShows = await Show.countDocuments();
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalBookings = await Booking.countDocuments();

    const revenueResult = await Booking.aggregate([
      { $match: { status: 'confirmed' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } },
    ]);
    const totalRevenue = revenueResult[0]?.total || 0;

    const recentBookings = await Booking.find()
      .populate('user', 'name email')
      .populate('movie', 'title')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({ totalMovies, totalShows, totalUsers, totalBookings, totalRevenue, recentBookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all movies
// @route   GET /api/admin/movies
// @access  Admin
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a movie
// @route   POST /api/admin/movies
// @access  Admin
const addMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a movie
// @route   PUT /api/admin/movies/:id
// @access  Admin
const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a movie
// @route   DELETE /api/admin/movies/:id
// @access  Admin
const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all bookings
// @route   GET /api/admin/bookings
// @access  Admin
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .populate('movie', 'title')
      .populate('show')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboardStats, getAllUsers, getAllMovies, addMovie, updateMovie, deleteMovie, getAllBookings };
