const express = require("express");
const router = express.Router();
const Song = require("../models/Song");
const User = require("../models/User");
const passport = require("passport");

// middleware lgana hai passport.authenticate("jwt")
// by default passport strategy name is "jwt"
// session is false because hme vo facebook ki tarah hr baar refresh pr logged in nahi rhna.
// hm jwt se bhej denge token toh session ki zarurat nahi hai.
router.post("/create", passport.authenticate("jwt", {session: false}), async (req, res) => {
  // req.user gets the user because of passport.authenticate("user")
  const { name, thumbnail, track } = req.body;
  if (!name || !thumbnail || !track) {
    return res
      .status(301)
      .json({ error: "Insuffient details to create song." });
  }
  const artist = req.user._id;
  const songDetails = {
    name,
    thumbnail,
    track,
    artist
  };
  const createdSong = await Song.create(songDetails);
  return res.status(200).json(createdSong);
});

// Get route to get all songs I have published.
router.get("/get/mysongs", passport.authenticate("jwt", {session: false}), async (req, res) => {
  const currentUser = req.user;

  // We need to get all songs where artist is equal to currentUser._id
  // .populate is used to get the details of the any entire JSON object as well that is present in the path.
  const songs = await Song.find({artist: req.user._id}).populate("artist");
  return res.status(200).json({data: songs});
});

// Get route to get all songs any artist has published.
// I will send the artist id and I want to see all songs that artist has published.
router.get("/get/artist/:artistId", passport.authenticate("jwt", {session: false}), async (req, res) => {
  const {artistId} = req.params;
  // We can check if the artist does not exist
  const artist = await User.findById({_id: artistId});
  if (!artist) {
    return res.status(301).json({error: "Artist not found"});
  }
  const songs = await Song.find({artist: artistId});
  return res.status(200).json({data: songs});
});

// Get route to get a single song by name.
router.get("/get/songname/:songName", passport.authenticate("jwt", {session: false}), async (req, res) => {
  const {songName} = req.params;
  
  // name: songName --> exact name matching. Vanilla, Vanila
  // pattern matching kr skte instead of direct name matching
  const songs = await Song.find({name: songName}).populate("artist");
  return res.status(200).json({data: songs});
});

module.exports = router;
