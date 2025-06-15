const sequelize = require("../config/database");
const User = require("./user");
const Event = require("./event");

User.hasMany(Event, { foreignKey: "firebaseUid" });
Event.belongsTo(User, { foreignKey: "firebaseUid" });

module.exports = { sequelize, User, Event };
