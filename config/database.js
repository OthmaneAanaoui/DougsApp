const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

// Charger les variables d'environnement à partir du fichier .env
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

module.exports = sequelize;
