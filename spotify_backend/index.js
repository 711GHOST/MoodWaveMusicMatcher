// npm init: package.json -- This is a node project
// npm i express: expressJS package install hogya -- project came to know that we are using express
// we finally use express

const express = require("express");
const mongoose = require("mongoose");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const User = require("./models/User");
const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/song");
const playlistRoutes = require("./routes/playlist");
const emotionRoutes = require("./routes/detect-emotion");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json()); // This is a middleware that will parse the incoming request body and convert it to JSON

// connect mongodb to our node app.
// mongoose.connect() takes 2 arguments : 1. url of mongodb 2. Connect options
mongoose
  .connect(
    `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@moodwave.sjxdwny.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`
  )
  .then((x) => {
    console.log("Connected to the database ");
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  });

// setup passport-jwt
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = `${process.env.SECRET}`; // secret key
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ _id: jwt_payload.identifier }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  })
);

// API: GET type : / : return text "Hello World"
app.get("/", (req, res) => {
  // res contains all data for the request
  // req contains all data for the response
  res.send("Hello World");
});

app.use("/auth", authRoutes);
app.use("/song", songRoutes);
app.use("/playlist", playlistRoutes);
app.use("/detect-emotion", emotionRoutes);

// Now we want to rell express that our server will run on localhost:3001
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

// JSON Web Token is a way to send data securely between the (client and server)
// Passport Package is used for this (jo continue with google, facebook buttons hote hain vo bi use hote hain )
// Hm use krenge passport-jwt that is used to verify identity of authorized user
