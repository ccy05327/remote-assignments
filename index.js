const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/healthcheck", (req, res) => {
  res.send("healthcheck");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
