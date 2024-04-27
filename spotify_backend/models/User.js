const mongoose = require('mongoose');

// How to create a model
// 1. Require mongoose
// 2. Create a schema (structure of user)
// 3. Create a model

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
        private: true,
    },
    email: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    likedSongs: {
        // We will change this to array
        type: String,
        default: "",
    },
    likedPlayLists: {
        // We will change this to array
        type: String,
        default: "",
    },
    suscribeArtists: {
        // We will change this to array
        type: String,
        default: "",
    },
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;
