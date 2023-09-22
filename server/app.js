// modules
require("dotenv").config();
const express = require("express");

// init
const app = express();
const port = process.env.PORT || 5000;

// check api running or not
app.get("/", (req, res) => {
  res.send("Taskera is running...");
});

app.listen(port, () => {
  console.log(`Taskera API is running on port: ${port}`);
});
