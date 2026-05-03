const Show = require('../models/Show');

// Generate seats layout: rows A-J, 10 columns each
const generateSeats = (priceRegular = 150, pricePremium = 250, priceRecliner = 400) => {
  const seats = [];
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  rows.forEach((row, rowIndex) => {
    for (let col = 1; col <= 10; col++) {
      let type = 'regular';
      let price = priceRegular;
      if (rowIndex >= 7) { type = 'recliner'; price = priceRecliner; }
      else if (rowIndex >= 4) { type = 'premium'; price = pricePremium; }

      seats.push({
        seatNumber: `${row}${col}`,
        row,
        column: col,
        type,
        price,
        isBooked: false,
      });
    }
  });
  return seats;
};

// @desc    Get shows for a movie
// @route   GET /api/shows/movie/:movieId
// @access  Public
const getShowsByMovie = async (req, res) => {
  try {
    const { date } = req.query;
    let query = { movie: req.params.movieId, isActive: true };
    if (date) {
      const [year, month, day] = date.split('-').map(Number);
      const start = new Date(year, month - 1, day, 0, 0, 0, 0);
      const end = new Date(start);
      end.setDate(end.getDate() + 1);
      query.date = { $gte: start, $lt: end };
    }
    const shows = await Show.find(query).populate('movie', 'title poster duration');
    res.json(shows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single show with seats
// @route   GET /api/shows/:id
// @access  Public
const getShowById = async (req, res) => {
  try {
    const show = await Show.findById(req.params.id).populate('movie');
    if (!show) return res.status(404).json({ message: 'Show not found' });
    res.json(show);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create show (Admin)
// @route   POST /api/shows
// @access  Admin
const createShow = async (req, res) => {
  try {
    const { movie, theater, screen, date, time, priceRegular, pricePremium, priceRecliner } = req.body;
    const seats = generateSeats(priceRegular, pricePremium, priceRecliner);
    const show = await Show.create({ movie, theater, screen, date, time, seats });
    res.status(201).json(show);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update show (Admin)
// @route   PUT /api/shows/:id
// @access  Admin
const updateShow = async (req, res) => {
  try {
    const show = await Show.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!show) return res.status(404).json({ message: 'Show not found' });
    res.json(show);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete show (Admin)
// @route   DELETE /api/shows/:id
// @access  Admin
const deleteShow = async (req, res) => {
  try {
    await Show.findByIdAndDelete(req.params.id);
    res.json({ message: 'Show deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all shows (Admin)
// @route   GET /api/shows
// @access  Admin
const getAllShows = async (req, res) => {
  try {
    const shows = await Show.find().populate('movie', 'title poster').sort({ date: -1 });
    res.json(shows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getShowsByMovie, getShowById, createShow, updateShow, deleteShow, getAllShows };
