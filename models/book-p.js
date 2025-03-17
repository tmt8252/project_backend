const mongoose = require("mongoose");

const book = new mongoose.Schema(
    {
        url: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        genre: {
            type: String,
            required: true,
        },
        subtitle: {
            type: String,
            required: true,
        },
        isbn13: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        published_date: {
            type: Date,
            required: true,
        },
        image: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("books", book);