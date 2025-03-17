const router = require("express").Router();
const User = require("../models/user-p");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Sign up(register)

router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password, number } = req.body;

    //check username length is more than 4
    if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "Username length should be greater than 3" });
    }

    //check username already exists?
    const existingUsername = await User.find({ username: username });
    if (existingUsername) {
      return res.status(400).json({ message: "username already exits" });
    }

    //check username email exists?
    const existingEmail = await User.find({ email: email });
    if (existingEmail) {
      return res.status(400).json({ message: "email already exits" });
    }

    //check password length?
    if (password.length <= 5) {
      return res
        .status(400)
        .json({ message: "password length should be greater than 5" });
    }
    const hashPass = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username,
      email: email,
      password: hashpass,
      number: number,
    });
    await newUser.save();
    return res.status(200).jsan({ message: "SignUP Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
