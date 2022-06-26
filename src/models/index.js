'use strict';
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const clothesModel = require('./clothes/model.js');
const foodModel = require('./food/model.js');
const usersModel = require('./users/users.js');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory';

const sequelize = new Sequelize(DATABASE_URL);

const food = foodModel(sequelize, DataTypes);
const clothes = clothesModel(sequelize, DataTypes);
const users = usersModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  food: food,
  clothes: clothes,
  users: users
};
