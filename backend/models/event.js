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
  description: DataTypes.STRING,
  category: DataTypes.STRING,
  approval: DataTypes.BOOLEAN,
  capacity: DataTypes.INTEGER,
});

Event.belongsTo(User, { foreignKey: "firebaseUid" });

module.exports = Event;
