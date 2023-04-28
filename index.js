var express = require('express');
var path = require("path");
var app = express();

var mysql = require('mysql2');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "world"
});
require('./api')(app, con);

app.get('/', function (req, res) {
    res.render('Index', { title: "Home", bgImg: "images/home.jpg", HomeClass: "active" });
});

app.get('/Home', function (req, res) {
    res.render('Index', { title: "Home", bgImg: "images/home.jpg", HomeClass: "active" });
});

app.get('/World', function (req, res) {
    res.render('World', { title: "World", bgImg: "images/world.jpg", WorldClass: "active" });
});

app.get('/Region', function (req, res) {
    res.render('Region', { title: "Region", bgImg: "images/region.jpg", RegionClass: "active" });
});

app.get('/Continents', function (req, res) {
    res.render('Continents', { title: "Continents", bgImg: "white", ContinentsClass: "active" });
});

app.get('/Countries', function (req, res) {
    if(req.query)
    res.render('Countries', { title: "Countries", bgImg: "white", CountriesClass: "active" });
});

app.post('/Countries', function (req, res) {
    res.render('Countries', { title: "Countries", bgImg: "white", CountriesClass: "active" });
});

app.get('/Cities', function (req, res) {
    res.render('Cities', { title: "Cities", bgImg: "white", CitiesClass: "active" });
});

app.get('/AboutUs', function (req, res) {
    res.render('AboutUs', { title: "About Us", bgImg: "aqua", AboutUsClass: "active" });
});

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.listen(3000);