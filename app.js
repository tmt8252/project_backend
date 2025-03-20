const express = require("express");
const app = express();
require("dotenv").config();
require("./conn/conn");
const user = require("./routes/user");
const Books = require("./routes/routebook-p");
const Cart = require("./routes/cart");
const auth = require("./routes/auth");
const cors = require("cors");

app.use(
  cors({
    origin: process.env.PUBLIC_URL, // Your frontend origin
    credentials: true, // If you're using cookies/sessions
  })
);

app.use(express.json());
//routes
app.use("/api/v1/user", user);
app.use("/api/v1/book", Books);
app.use("/api/v1/cart", Cart);
app.use("/api/v1/auth", auth);
//creating port
app.listen(process.env.PORT, () => {
  console.log(`server running at port ${process.env.PORT}`);
});
