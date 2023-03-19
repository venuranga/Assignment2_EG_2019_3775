const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: { type: String, required: true },
    year: { type: String, required: true },
    director: { type: String, required: true },
    genre: { type: String, required: true },
    cast: { type: [String], required: true },
    plot: { type: String, required: true },
    rating: { type: Number, required: true },
    runtime: { type: String, required: true },
    poster: { type: String, required: true }
});
const Movie = mongoose.model('Movie', movieSchema);
module.exports = mongoose.model('Movie', movieSchema);


