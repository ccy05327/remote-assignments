const express = require("express");
const app = express();
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

// app.post("/users", (req, res) => {
//   const { name, email, password } = req.body;

//   const query_exist = `SELECT * FROM user WHERE EXISTS (SELECT * FROM user WHERE email = '${email}');`;
//   const query_insert_new = `INSERT INTO user (name, email, password) VALUES ('${name}', '${email}', '${password}');`
//   const query_select = `SELECT * FROM user ORDER BY created DESC LIMIT 1;`;

//   connection.query(query_exist, (err, result) => {
//     if (err) {
//       console.log(err);
//       res.sendStatus(400).json({ error: "Internal Server Error" });
//       return;
//     }
//     if (result == []) {
//       // found existing email
//       console.log(`found existing email address`);
//       res.sendStatus(403).json({ error: "found existing email address" });
//       return;
//     }
//     console.log(query_insert_new);
//     connection.query(query_insert_new, (err) => {
//       if (err) {
//         res.send("Failed to add user");
//         return;
//       }
//       console.log("new user added");
//       connection.query(query_select, (err, user) => {
//         if (err) {
//           res.send("Failed to found latest user");
//           return;
//         }
//         // console.log(user);
//         res.json({ user: user });
//       });
//     });
//   });
// });

const cors = require("cors");
const { check, validationResult } = require("express-validator");

// Create a connection pool to the AWS RDS MySQL database
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "database-1.cwh9i5ebaxwd.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "remotelearning",
  database: "assignment",
  port: 3000,
});

// Add middleware for parsing JSON requests and enabling CORS
app.use(cors());

// Define a route for user signup
app.post(
  "/users",
  [
    check("name")
      .isAlphanumeric()
      .withMessage("Name must only contain letters and numbers"),
    check("email").isEmail().withMessage("Email must be in the correct format"),
    check("password")
      .isLength({ min: 4 })
      .withMessage("Password must be at least 4 characters long")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/
      )
      .withMessage(
        "Password must contain at least 3 of the following 4 types of characters: uppercase letters, lowercase letters, numbers, and symbols"
      ),
  ],
  (req, res) => {
    // Check if there are any validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract user input from the request body
    const { name, email, password } = req.body;

    // Check if the email already exists in the database
    pool.query(
      "SELECT * FROM user WHERE email = ?",
      email,
      (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: "Server error" });
        }

        if (results.length > 0) {
          return res.status(403).json({ message: "Email already exists" });
        }

        // Insert the new user data into the database
        const insertQuery = `INSERT INTO user (name, email, password) VALUES (?, ?, ?)`;
        const date = new Date().toISOString().slice(0, 19).replace("T", " ");
        pool.query(insertQuery, [name, email, password], (error, results) => {
          if (error) throw error;
          const userId = results.insertId;
          const data = { id: userId, name, email, date };

          // Retrieve the latest entry data
          pool.query(
            "SELECT id, name, email, created FROM user WHERE id = ?",
            results.insertId,
            (error, results) => {
              if (error) {
                console.error(error);
                return res.status(500).json({ message: "Server error" });
              }

              // Return the user data along with a success status code
              res.status(200).json({ user: results[0] });
            }
          );
        });
      }
    );
  }
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
