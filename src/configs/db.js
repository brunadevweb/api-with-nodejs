require('dotenv').config();

module.export = {
    dialect: process.env.DIALECT,
    host: process.env.HOST,
    username: process.env.DB_USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
    define: {
        timestamp: true,
        underscored: true,
        underscoredAll: true,
    },
};

const mysql = require('mysql2/promise');

async function connect() {
    const connection = await mysql.createConnection({
        host: process.env.HOST,
        user: process.env.DB_USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        port: process.env.DB_PORT
    });

    return connection;
}

module.exports = {
    connect
};