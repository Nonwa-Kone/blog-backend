require("dotenv").config();
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const routerUser = require("./routes/User");

async function connectDB() {
  await mongoose.connect(process.env.MONGODB_LOCAL);
}
connectDB();

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users/auth', routerUser)


module.exports = app;