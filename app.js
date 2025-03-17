const express = require("express");
const app = express();
require("dotenv").config();
require("./conn/conn");
const user = require("./routes/routeuser-p");
const Books = require("./routes/routebook-p");
const Cart = require("./routes/cart");

app.use(express.json());
//routes
app.use("/ap1/v1", user);
app.use("/ap1/v1", Books);
app.use("/api/v1", Cart);

//creating port
app.listen(process.env.PORT, () => {
  console.log(`server started at port ${process.env.PORT}`);
});
