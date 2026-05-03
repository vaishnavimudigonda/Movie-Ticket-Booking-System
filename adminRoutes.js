const express = require('express');
const router = express.Router();
const { getDashboardStats, getAllUsers, getAllMovies, addMovie, updateMovie, deleteMovie, getAllBookings } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/stats', protect, adminOnly, getDashboardStats);
router.get('/users', protect, adminOnly, getAllUsers);

// Movie routes
router.route('/movies')
  .get(protect, adminOnly, getAllMovies)
  .post(protect, adminOnly, addMovie);

router.route('/movies/:id')
  .put(protect, adminOnly, updateMovie)
  .delete(protect, adminOnly, deleteMovie);

// Booking routes
router.get('/bookings', protect, adminOnly, getAllBookings);

module.exports = router;
