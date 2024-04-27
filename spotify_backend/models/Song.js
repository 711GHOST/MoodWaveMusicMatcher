const mongoose = require('mongoose');

// How to create a model
// 1. Require mongoose
// 2. Create a schema (structure of song)
// 3. Create a model

const song = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    track: {
        type: String,
        required: true,
    },
    artist: {
        type: mongoose.Types.ObjectId,
        ref: "users",
    },
});

const songModel = mongoose.model('songs', song);

module.exports = songModel;
