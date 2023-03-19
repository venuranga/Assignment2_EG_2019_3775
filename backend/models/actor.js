const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const actorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dob: { type: String, required: true },
    nationality: { type: String, required: true },
    filmography: { type: [String], required: true },
    awards: { type: [String], required: true },
    socialMedia: { type: [String], required: true }
});

const Actor = mongoose.model('Actor', actorSchema);

module.exports = mongoose.model('Actor', actorSchema);