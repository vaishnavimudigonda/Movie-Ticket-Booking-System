const express = require('express');
const router = express.Router();
const { getShowsByMovie, getShowById, createShow, updateShow, deleteShow, getAllShows } = require('../controllers/showController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', protect, adminOnly, getAllShows);
router.get('/movie/:movieId', getShowsByMovie);
router.get('/:id', getShowById);
router.post('/', protect, adminOnly, createShow);
router.put('/:id', protect, adminOnly, updateShow);
router.delete('/:id', protect, adminOnly, deleteShow);

module.exports = router;
