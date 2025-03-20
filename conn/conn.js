const mongoose = require("mongoose");

const conn = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log("\x1b[32m%s\x1b[0m", "Connected to database");
  } catch (error) {
    console.log("\x1b[31m%s\x1b[0m", "Database not connected", error);
    process.exit(1);
  }
};
conn();
