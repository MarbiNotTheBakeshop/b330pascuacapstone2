const express = require("express");

const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const cartRoutes = require("./routes/cartRoutes.js");

const cors = require("cors");

const Product = require("./models/Product.js");
const User = require("./models/User.js");
const Cart = require("./models/Cart.js");

const port = 4003;

const app = express();

mongoose.connect("mongodb+srv://admin:admin@batch330pascua.iokk42e.mongodb.net/MaCoffee_API?retryWrites=true&w=majority")

let connect = mongoose.connection;


connect.once("open", () => {
console.log("Database connected!");
})

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors());

app.use("/b3/users", userRoutes);
app.use("/b3/products", productRoutes);
app.use("/b3/carts", cartRoutes);

app.listen(port, () => {
  console.log(`API is now online on port ${port}!`);
})