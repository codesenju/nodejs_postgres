// Constants
const express = require('express');
const APP_PORT = '3000';
const HOST = '0.0.0.0';


// Connect to postgresql container instance
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "postgres",
  database: "movie",
  password: "12345",
  port: 5432
});

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Health OK!');
});

//Create Query
app.get("/api/v1/movies", (req, res) => {
    pool.query(
      `select * from basic fetch first 50 rows only`,
      [],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).json(results.rows);
      }
    );
  });
  app.get("/api/v1/movies/:title", (req, res) => {
    pool.query(
      `select * from basic where LOWER(primarytitle) like LOWER('%${req.params.title}%') AND titletype like 'movie%'`,
      [],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).json(results.rows);
      }
    );
  });

  app.listen(APP_PORT, HOST);
  console.log(`Running on http://${HOST}:${APP_PORT}`);