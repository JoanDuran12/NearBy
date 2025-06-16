const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: DataTypes.STRING,
  username: {
    type: DataTypes.STRING,
    unique: true
  },
  profilePic: DataTypes.STRING
});

module.exports = User;
