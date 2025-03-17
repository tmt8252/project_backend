const mongoose = require("mongoose");

const user = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    createdAt: [
      {
        type: Date,
        default: Date.now,
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("login", login);
