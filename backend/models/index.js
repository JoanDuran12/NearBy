const sequelize = require("../config/database");
const User = require("./user");
const Event = require("./event");

User.hasMany(Event, { foreignKey: "firebaseUid", sourceKey: "firebaseUid" });
Event.belongsTo(User, { foreignKey: "firebaseUid", targetKey: "firebaseUid" });

module.exports = { sequelize, User, Event };
