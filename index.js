var mysql = require('mysql2');
var express = require('express');
var path = require("path");
var app = express();

var con = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "root",
   database: "world"
 });

app.get('/', function(req, res){
   res.render('index', {title: "Home"});
});

app.get('/Home', function(req, res){
   res.render('index', {title: "Home"});
});

app.get('/World', function(req, res){
   res.render('world', {title: "World"});
});

app.get('/Continents', function(req, res){
   res.render('continents', {title: "Continents"});
});

app.get('/Countries', function(req, res){
   con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      con.query("SELECT * FROM country;", function (err, result) {
        if (err) throw err;
        res.render('Countries', {title: "Countries", data: result});
      });
    });
});

app.set('view engine', 'pug');
app.set('views',path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.listen(3000);