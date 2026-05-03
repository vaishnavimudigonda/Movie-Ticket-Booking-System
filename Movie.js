const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    poster: { type: String, default: 'https://via.placeholder.com/500x750?text=No+Poster' }, // URL
    banner: { type: String, default: '' },
    genre: [{ type: String }],
    duration: { type: Number, required: true }, // in minutes
    language: { type: String, default: 'English' },
    releaseDate: { type: Date },
    rating: { type: Number, default: 0, min: 0, max: 10 },
    cast: [
      {
        name: { type: String },
        role: { type: String },
        photo: { type: String },
      },
    ],
    director: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Movie', movieSchema);
