const mongoose = require("mongoose");

const conn = async () => {
    try {
        await mongoose.connect(`${process.env.URI}`);
        console.log("Connected to database");
    } catch (error) {
        console.log("Database not connected",error);
        process.exit(1);
    }
};
conn();
