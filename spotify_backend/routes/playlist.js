const express = require("express");
const passport = require("passport");
const Playlist = require("../models/Playlist");
const User = require("../models/User");
const Song = require("../models/Song");
router = express.Router();

// Route 1: Create a new playlist
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentUser = req.user;
    const { name, thumbnail, songs } = req.body;
    if (!name || !thumbnail || !songs) {
      return res
        .status(301)
        .json({ message: "Please provide all required fields" });
    }
    const playlistData = {
      name,
      thumbnail,
      songs,
      owner: currentUser._id,
      collaborators: [],
    };
    const playlist = await Playlist.create(playlistData);
    return res.status(200).json(playlist);
  }
);

// Route 2: Get a playlist by ID
// We will get the playlist ID as a router parameter and will return the playlist having that ID
// :playListId is a variable jisme bohot saari values aa sakti hain based on the user value
// if you call anything of the format /playlist/get/anything_here
// if you called /playlist/get/id will get assigned here
router.get(
  "/get/playlist/:playListId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // this concept is called req.params
    const playListId = req.params.playListId; // getting the playlist id from the request

    // I want to find the playlist with the _id = playListId
    const playlist = await Playlist.findOne({ _id: playListId }).populate({

      path: "songs",
      populate: {
        path: "artist",
        model: "users",
      },
    }
    );
    if (!playlist) {
      return res.status(301).json({ message: "Invalid ID" });
    }
    return res.status(200).json(playlist);
  }
);

// Route 3: Get all playlists made by me
router.get(
  "/get/me",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const artistId = req.user._id;

    const playlists = await Playlist.find({ owner: artistId }).populate(
      "owner"
    );
    // []
    return res.status(200).json({ data: playlists });
  }
);

// Route 4: Get all playlists made by an artist
router.get(
  "/get/artist/:artistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const artistId = req.params.artistId;

    // We can do this: Check if artist with given artist Id exists
    const artist = await User.findOne({ _id: artistId });

    if (!artist) {
      return res.status(304).json({ message: "Invalid artist ID" });
    }

    const playlists = await Playlist.find({ owner: artistId });
    // []
    return res.status(200).json({ data: playlists });
  }
);

// Add a song to a playlist
router.post(
  "/add/song",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentUser = req.user;
    const { playListId, songId } = req.body;
    // Step 0: Check if the playlist and song exist
    const playlist = await Playlist.findOne({ _id: playListId });
    if (!playlist) {
      return res.status(304).json({ message: "Invalid playlist ID" });
    }

    // Step 1: Check if currentUser owns the playlist or is the collaborator
    if (
      !playlist.owner.equals(currentUser._id) &&
      playlist.collaborators.includes(currentUser._id)
    ) {
      return res.status(400).json({
        message: "You are not authorized to add songs to this playlist",
      });
    }

    // Step 2: Check if the song is a valid song
    const song = await Song.findOne({ _id: songId });
    if (!song) {
      return res.status(304).json({ message: "Song does not exist" });
    }

    // Step 3: Add the song to the playlist
    playlist.songs.push(songId);
    await playlist.save();

    return res.status(200).json(playlist);
  }
);

module.exports = router;
