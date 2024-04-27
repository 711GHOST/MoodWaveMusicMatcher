const express = require("express");
// Router waale packages import krlo instead saare krne se
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { getToken } = require("../utils/helpers");

// This POST route will help to register a new user
router.post("/register", async (req, res) => {
  // Step 1:  This code will run when the /register api is called as a POST request
  // My req.body will be of the format {email, password, firstName, lastName, userName}

  const { email, password, firstName, lastName, userName } = req.body;

  // Step 2: Does the user with this email already exists? If yes, we throw an error.
  const user = await User.findOne({ email: email });
  if (user) {
    // status code by default is 200, 200 means OK
    // errors are given with 400 lines as per standard conventions
    return res.status(403).json({ error: "User already exists" });
  }
  // This is a valid request

  // Step 3: Create a new user in the DB
  // Step 3.1: We do not store passwords in plain text format. We hash them using bcrypt
  // xyz --> addkgfsdbksuydhjsdvy
  // My hash of xyz depends on 2 parameters
  // If I keep those 2 parameters same, xyz always gives the same hash.
  // Salt rounds is the number of times the password is hashed
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUserData = {
    email,
    password: hashedPassword,
    firstName,
    lastName,
    userName,
  };
  const newUser = await User.create(newUserData);

  // Step 4: We want to create the token to return to the user
  const token = await getToken(email, newUser);

  // Step 5: Return the result to the user
  const userToReturn = {...newUser.toJSON(), token};
  delete userToReturn.password;
  return res.status(200).json(userToReturn);
});

router.post('/login', async (req, res) => {
  // Step 1: Get email and password sent by user from req.body
  const {email, password} = req.body;
  
  // Step 2: Check if user with this email exists in the DB
  const user = await User.findOne({email: email});
  if (!user) {
    return res.status(403).json({error: "Invalid credentials"});
  }

  // Step 3: If user does not exist, return an error (credentials are wrong)
  // This is tricky part kyunki password hashed me stored hai
  // I cannot directly check if password === user.password
  // sood123 --> hashedPassword
  // I need to use bcrypt to compare the password
  // bcrypt.compare enabled us to compare the password in plaintext(password from req.body) with the hashed password(the one in our db) securly.
  const isPasswordValid = await bcrypt.compare(password, user.password);
  // This will be True or False
  if(!isPasswordValid) {
    return res.status(403).json({error: "Invalid credentials"});
  }
  
  // Step 4: If the credentials are correct, return token to the user 
  const token = await getToken(email, user);
  
  // Step 5: Return the result to the user
  const userToReturn = {...user.toJSON(), token};
  delete userToReturn.password;
  return res.status(200).json(userToReturn);
});

module.exports = router;

// token basically ek esa secret credential hai jo help krega user ko verify aur identify krne me