const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "database-1.cwh9i5ebaxwd.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "remotelearning",
  database: "assignment",
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/healthcheck", (req, res) => {
  res.send("healthcheck");
});

app.get("/users", (req, res) => {
  res.render("user");
});

app.post("/users", (req, res) => {
  const { name, email, password } = req.body;

  const query_exist = `SELECT * FROM user WHERE EXISTS (SELECT * FROM user WHERE email = '${email}');`;
  const query_insert_new = `INSERT INTO user (name, email, password) VALUES ('${name}', '${email}', '${password}');`
  const query_select = `SELECT * FROM user ORDER BY created DESC LIMIT 1;`;

  connection.query(query_exist, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(400).json({ error: "Internal Server Error" });
      return;
    }
    if (result == []) {
      // found existing email
      console.log(`found existing email address`);
      res.sendStatus(403).json({ error: "found existing email address" });
      return;
    }
    console.log(query_insert_new);
    connection.query(query_insert_new, (err) => {
      if (err) {
        res.send("Failed to add user");
        return;
      }
      console.log("new user added");
      connection.query(query_select, (err, user) => {
        if (err) {
          res.send("Failed to found latest user");
          return;
        }
        // console.log(user);
        res.json({ user: user });
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
