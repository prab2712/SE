const express = require("express");
const app = express();
const port = 3000;

const cors = require("cors");
var connection = require("./database.js");
var router = express.Router();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.unsubscribe(cors());

app.set("view engine", "pug");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.pug", {
    title: "Home Page",
  });
});
app.get("/about", (req, res) => {
  res.render("about.pug", {
    title: "About Page",
  });
});
router.get("/", function(request, response, next){

	var query = "SELECT SUM(Population) AS 'Total Population' FROM country";

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('index.pug', {title:'Node.js MySQL CRUD Application', action:'list', sampleData:data});
		}

	});

});

module.exports = router;


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
