const Sequelize = require('sequelize');
const dotenv = require('dotenv/config');

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;

const connection = new Sequelize(
    dbName,dbUser,dbPassword, {
        host:dbHost,
        dialect:'mysql',
        timezone:'-03:00'
    }
);

module.exports = connection;