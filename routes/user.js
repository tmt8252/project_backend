const router = require("express").Router();
const User = require("../models/user-p");

const { authenticateToken } = require("../middleware");

//get-user information
router.get("/get", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const data = await User.findById(id);
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Ïnternal server error" });
  }
});
module.exports = router;
