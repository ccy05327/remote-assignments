const mysql = require("mysql2");

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

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
  } else {
    console.log("Connected to MySQL database!");
    connection.release();
  }
});

// pool.query("DELETE FROM user WHERE id = 0;", (err) => {
//   if (err) throw err;
// });

pool.query("SELECT * FROM user", (error, results, fields) => {
  if (error) throw error;
  console.log(results);
  connection.release();
});
