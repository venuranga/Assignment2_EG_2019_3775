const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const reviewSchema = new mongoose.Schema({
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    reviewer: { type: String, required: true },
    rating: { type: Number, required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = mongoose.model('Review', reviewSchema);