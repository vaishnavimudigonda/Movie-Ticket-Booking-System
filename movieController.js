const Movie = require('../models/Movie');

// @desc    Get all active movies
// @route   GET /api/movies
// @access  Public
const getMovies = async (req, res) => {
  try {
    const { genre, search } = req.query;
    let query = { isActive: true };

    if (genre && genre !== 'All') {
      query.genre = { $in: [genre] };
    }
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const movies = await Movie.find(query).sort({ createdAt: -1 });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single movie
// @route   GET /api/movies/:id
// @access  Public
const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create movie (Admin)
// @route   POST /api/movies
// @access  Admin
const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update movie (Admin)
// @route   PUT /api/movies/:id
// @access  Admin
const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete movie (Admin)
// @route   DELETE /api/movies/:id
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

module.exports = { getMovies, getMovieById, createMovie, updateMovie, deleteMovie };
