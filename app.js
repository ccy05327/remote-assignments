const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "database-1.cwh9i5ebaxwd.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "remotelearning",
  database: "assignment",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
  } else {
    console.log("Connected to MySQL database!");
  }
});

// connection.query("DELETE FROM user WHERE id = 0;", (err) => {
//   if (err) throw err;
// });

connection.query("SELECT * FROM user", (error, results, fields) => {
  if (error) throw error;
  console.log(results);
});

connection.end();
