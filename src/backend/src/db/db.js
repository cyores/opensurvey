const { Pool } = require("pg");
const isProduction = process.env.PRODUCTION === "true";

const connectionString = isProduction
    ? process.env.DATABASE_URL
    : `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const pool = new Pool({
    connectionString: connectionString,
    ssl: isProduction
});

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    }
};
