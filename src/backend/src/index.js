require("dotenv").config();

const express = require("express");
const { pool } = require("./db");

const app = express();
const port = process.env.PORT || "8000";

app.use(express.json());

app.get("/", (req, res) => {
    pool.query("SELECT * FROM surveys", (err, results) => {
        if (err) throw err;
        res.status(200).json(results.rows);
    });
});

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});
