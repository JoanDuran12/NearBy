"use strict";

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const Event = sequelize.define("Event", {
  eventId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  eventPic: DataTypes.STRING,
  eventName: DataTypes.STRING,
  startDate: DataTypes.DATEONLY,
  endDate: DataTypes.DATEONLY,
  startTime: DataTypes.TIME,
  endTime: DataTypes.TIME,
  location: DataTypes.STRING,
  latitude: DataTypes.FLOAT,
  longitude: DataTypes.FLOAT,
  description: DataTypes.TEXT,
  category: DataTypes.STRING,
  approval: DataTypes.BOOLEAN,
  capacity: DataTypes.INTEGER,
  firebaseUid: {
    type: DataTypes.STRING,
    references: {
      model: User,
      key: "firebaseUid",
    },
  },
});

Event.belongsTo(User, { foreignKey: "firebaseUid", sourceKey: "firebaseUid" });

module.exports = Event;
