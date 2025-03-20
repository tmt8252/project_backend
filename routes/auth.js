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
    const existingUsername = await User.findOne({ username: username });
    if (existingUsername) {
      return res.status(400).json({ message: "username already exits" });
    }

    //check username email exists?
    const existingEmail = await User.findOne({ email: email });
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
      password: hashPass,
      number: number,
    });

    await newUser.save();
    return res.status(200).json({ message: "SignUP Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(304).json({ message: "Invalid credentials" });
    }
    bcrypt.compare(password, existingUser.password, (err, data) => {
      if (data) {
        const authClaims = [
          { email: existingUser.email },
          { role: existingUser.role },
        ];
        const token = jwt.sign({ authClaims }, "bookstore", {
          expiresIn: "30d",
        });
        return res.status(200).json({
          id: existingUser._id,
          role: existingUser.role,
          token: token,
        });
      } else {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
