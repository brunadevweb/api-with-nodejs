const sequelize = require('sequelize');

const databaseConfig = require('../config/db');

class Database {
    constructor() {
        this.init();

    }

    inti() {
        this.connection = new sequelize(databaseConfig);
    }
}

module.exports = new Database();