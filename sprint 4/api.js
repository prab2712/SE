module.exports = function (app, con) {
    app.get('/getCountriesList', function (req, res) {
        let page = 1;
        let rows = 10;
        if (req.query) {
            if(req.query.page) page = parseInt(req.query.page);
            if(req.query.rows) rows = parseInt(req.query.rows);
        }
        let offset = (page - 1) * rows;
        let resultset = {};
        con.connect(function (err) {
            if (err) throw err;
            con.query("SELECT COUNT(*) AS Totals FROM country", function (err, result) {
                if (err) throw err;
                resultset["total"] = result[0]['Totals'];
                con.query("SELECT * FROM country limit " + offset + "," + rows, function (err, result) {
                    if (err) throw err;
                    resultset["rows"] = result;
                    res.write(JSON.stringify(resultset));
                    res.end();
                });
            });
        });
    });

    app.get('/getCountriesList/:Filter', function (req, res) {
        let page = 1;
        let rows = 10;
        if (req.query) {
            if(req.query.page) page = parseInt(req.query.page);
            if(req.query.rows) rows = parseInt(req.query.rows);
        }
        let offset = (page - 1) * rows;
        let resultset = {};
        con.connect(function (err) {
            if (err) throw err;
            con.query("SELECT COUNT(*) AS Totals FROM country WHERE NAME LIKE '%"+req.params.Filter+"%'", function (err, result) {
                if (err) throw err;
                resultset["total"] = result[0]['Totals'];
                con.query("SELECT * FROM country WHERE NAME LIKE '%"+req.params.Filter+"%' limit " + offset + "," + rows, function (err, result) {
                    if (err) throw err;
                    resultset["rows"] = result;
                    res.write(JSON.stringify(resultset));
                    res.end();
                });
            });
        });
    });

    app.get('/addCountry', function (req, res) {
        let data = req.query;
        con.connect(function (err) {
            if (err) throw err;
            var sql = "INSERT INTO country(Code,Name,Continent,Region,SurfaceArea,IndepYear,Population,LifeExpectancy,GNP,GNPOld,LocalName,GovernmentForm,HeadOfState,Capital,Code2)" +
                "VALUES('" + data.Code + "','" + data.Name + "','" + data.Continent + "','" + data.Region + "','" + data.SurfaceArea + "','" + data.IndepYear + "','" + data.Population + "','" +
                data.LifeExpectancy + "','" + data.GNP + "','" + data.GNPOld + "','" + data.LocalName + "','" + data.GovernmentForm + "','" + data.HeadOfState + "','" + data.Capital + "','" + data.Code2 + "')";
            con.query(sql, function (err, result) {
                if (err) {
                    res.write(err.message);
                    console.log("Country insertion Error: " + err.message);
                }
                else {
                    res.write("inserted");
                    console.log("Country inserted: " + data.Name);
                }
                res.end();
            });
        });
    });

    app.get('/updateCountry', function (req, res) {
        let data = req.query;
        con.connect(function (err) {
            if (err) throw err;
            var sql = "UPDATE country SET Name='" + data.Name + "',Continent='" + data.Continent + "',Region='" + data.Region + "',SurfaceArea='" + data.SurfaceArea + "'," +
                "IndepYear='" + data.IndepYear + "',Population='" + data.Population + "'," + "LifeExpectancy='" + data.LifeExpectancy + "',GNP='" + data.GNP + "',GNPOld='" + data.GNPOld + "'," +
                "LocalName='" + data.LocalName + "',GovernmentForm='" + data.GovernmentForm + "',HeadOfState='" + data.HeadOfState + "',Capital='" + data.Capital + "',Code2='" + data.Code2 + "'" +
                " WHERE Code='" + data.Code + "'";
            con.query(sql, function (err, result) {
                if (err) {
                    res.write(err.message);
                    console.log("Country updation Error: " + err.message);
                }
                else {
                    res.write("updated");
                    console.log("Country updated: " + data.Name);
                }
                res.end();
            });
        });
    });

    app.post('/deleteCountry/:Code', function (req, res) {
        con.connect(function (err) {
            if (err) {
                res.write(err.message);
                console.log("Country deletion Error: " + err.message);
                res.end();
            }
            var sql = "DELETE FROM city WHERE CountryCode='" + req.params.Code + "'";
            con.query(sql, function (err, result) {
                if (err) {
                    res.write(err.message);
                    console.log("Country deletion Error: " + err.message);
                    res.end();
                }
                var sql = "DELETE FROM countrylanguage WHERE CountryCode='" + req.params.Code + "'";
                con.query(sql, function (err, result) {
                    if (err) {
                        res.write(err.message);
                        console.log("Country deletion Error: " + err.message);
                        res.end();
                    }
                    var sql = "DELETE FROM country WHERE Code='" + req.params.Code + "'";
                    con.query(sql, function (err, result) {
                        if (err) {
                            res.write(err.message);
                            console.log("Country deletion Error: " + err.message);
                            res.end();
                        } else {
                            console.log("Country deleted: " + req.params.Code);
                            res.write("deleted");
                            res.end();
                        }
                    });
                });
            });
        });
    });

    app.get('/getCitiesList', function (req, res) {
        let page = 1;
        let rows = 10;
        if (req.query) {
            if(req.query.page) page = parseInt(req.query.page);
            if(req.query.rows) rows = parseInt(req.query.rows);
        }
        let offset = (page - 1) * rows;
        let resultset = {};
        con.connect(function (err) {
            if (err) throw err;
            con.query("SELECT COUNT(*) AS Totals FROM city", function (err, result) {
                if (err) throw err;
                resultset["total"] = result[0]['Totals'];
                con.query("SELECT city.*, country.Name as Country FROM city JOIN country on city.CountryCode = country.Code limit " + offset + "," + rows, function (err, result) {
                    if (err) throw err;
                    resultset["rows"] = result;
                    res.write(JSON.stringify(resultset));
                    res.end();
                });
            });
        });
    });

    app.get('/getCitiesList/:Filter', function (req, res) {
        let page = 1;
        let rows = 10;
        if (req.query) {
            if(req.query.page) page = parseInt(req.query.page);
            if(req.query.rows) rows = parseInt(req.query.rows);
        }
        let offset = (page - 1) * rows;
        let resultset = {};
        con.connect(function (err) {
            if (err) throw err;
            con.query("SELECT COUNT(*) AS Totals FROM city WHERE NAME LIKE '%"+req.params.Filter+"%'", function (err, result) {
                if (err) throw err;
                resultset["total"] = result[0]['Totals'];
                con.query("SELECT city.*, country.Name as Country FROM city JOIN country on city.CountryCode = country.Code WHERE city.NAME LIKE '%"+req.params.Filter+"%' limit " + offset + "," + rows, function (err, result) {
                    if (err) throw err;
                    resultset["rows"] = result;
                    res.write(JSON.stringify(resultset));
                    res.end();
                });
            });
        });
    });

    app.get('/addCity', function (req, res) {
        let data = req.query;
        con.connect(function (err) {
            if (err) throw err;
            var sql = "INSERT INTO city(Name,CountryCode,District,Population)" + " VALUES('" + data.Name + "','" + data.CountryCode + "','" + data.District + "','" + data.Population + "')";
            con.query(sql, function (err, result) {
                if (err) {
                    res.write(err.message);
                    console.log("City insertion Error: " + err.message);
                }
                else {
                    res.write("inserted");
                    console.log("City inserted: " + data.Name);
                }
                res.end();
            });
        });
    });

    app.get('/updateCity', function (req, res) {
        let data = req.query;
        con.connect(function (err) {
            if (err) throw err;
            var sql = "UPDATE city SET Name='" + data.Name + "',CountryCode='" + data.CountryCode + "',District='" + data.District + "',Population='" + data.Population + "' WHERE ID='" + data.ID + "'";
            con.query(sql, function (err, result) {
                if (err) {
                    res.write(err.message);
                    console.log("City updation Error: " + err.message);
                }
                else {
                    res.write("updated");
                    console.log("City updated: " + data.Name);
                }
                res.end();
            });
        });
    });

    app.post('/deleteCity/:ID', function (req, res) {
        con.connect(function (err) {
            if (err) throw err;
            var sql = "DELETE FROM city WHERE ID='" + req.params.ID + "'";
            con.query(sql, function (err, result) {
                if (err) {
                    res.write(err.message);
                    console.log("City deletion Error: " + err.message);
                }
                else {
                    res.write("deleted");
                    console.log("City deleted: " + req.params.ID);
                }
                res.end();
            });
        });
    });

    app.get('/authenticate', function (req, res) {
        let data = req.query;
        if (data.UserId == 'admin' && data.Password == 'admin') {
            res.write('true');
        } else {
            res.write('false');
        }
        res.end();
    });
}