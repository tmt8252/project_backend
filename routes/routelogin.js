const router = require("express").Router();
const login = require("../models/login");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");

//login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.finOne({ email });
    if (!existingUser) {
      res.status(400).json({ message: "Invalid credentials" });
    }
    await bcrypt.compare(password, existingUser.password, (err, data) => {
      if (data) {
        const authClaims = [
          { email: existingUser.email },
          { role: existingUSer.role },
        ];
        const token = jwt.sign({ authClaims }, "bookstore", {
          expiresIn: "30d",
        });
        res.status(200).json({
          id: existingUser._id,
          role: existingUSer.role,
          token: token,
        });
      } else {
        res.status(400).json({ message: "Invalid credentials" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//get-user information
router.get("/get-user-information", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const data = await User.findId(id);
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Ïnternal server error" });
  }
});
module.exports = router;
