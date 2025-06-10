const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Recipe = sequelize.define('Recipe', {
  title: DataTypes.STRING,
  ingredients: DataTypes.TEXT,
  instructions: DataTypes.TEXT,
  cookingTime: DataTypes.INTEGER,
});

module.exports = Recipe;
