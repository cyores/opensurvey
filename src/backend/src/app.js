require("dotenv").config();
const port = process.env.PORT || "8000";

const express = require("express");
const app = express();
const routes = require("./routes");

app.use(express.json());

// app.get("/", (req, res) => res.sendStatus(200));

app.use("/api", routes);

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});

module.exports = {
    app
};
