const mongoose = require('mongoose');

// How to create a model
// 1. Require mongoose
// 2. Create a schema (structure of playlist)
// 3. Create a model

const playLists = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "users",
    },
    songs: [
        {
            type: mongoose.Types.ObjectId,
            ref: "songs",
        },
    ],
    // ye kaam aaega baad me jb mood based songs suggest krne honge
    collaborators: [
        {
            type: mongoose.Types.ObjectId,
            ref: "users",
        },
    ],
});

const playList = mongoose.model('playlists', playLists);

module.exports = playList;