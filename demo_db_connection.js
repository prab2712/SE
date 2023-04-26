var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "world"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("SELECT * FROM country;", function (err, result, fields) {
    if (err) throw err;
    console.log("Result: " + result);
  });
});