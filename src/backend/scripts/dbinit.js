require("dotenv").config({ path: "./.env" });

const db = require("../src/db/db");
const fs = require("fs");

fs.readFile("./scripts/dbinit.sql", (err, data) => {
    if (err) throw err;

    db.query(data.toString())
        .then(done => {
            console.log("done", done);
            process.exit();
        })
        .catch(error => {
            console.log(error);
            process.exit();
        });
});
