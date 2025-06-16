const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Event = sequelize.define('Event', {
  eventId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  eventName: DataTypes.STRING,
  startTime: DataTypes.TIME,
  endTime: DataTypes.TIME,
  startDate: DataTypes.DATEONLY,
  endDate: DataTypes.DATEONLY,
  location: DataTypes.STRING
});

Event.belongsTo(User, { foreignKey: 'userId' });

module.exports = Event;
