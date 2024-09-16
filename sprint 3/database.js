const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'world'
  });

  connection.connect((err) => {
    if (err) {
      console.log(err)
      return
    }
    console.log('Database connected')
  })
  module.exports = connection