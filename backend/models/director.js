const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const directorSchema = new Schema({
    name: { type: String, required: true },
    dob: { type: String, required: true },
    nationality: { type: String, required: true },
    filmography: { type: [String], required: true },
    awards: { type: [String], required: true }
});

const Director = mongoose.model('Director', directorSchema);

module.exports = mongoose.model('Director', directorSchema);