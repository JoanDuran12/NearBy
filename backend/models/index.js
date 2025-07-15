const sequelize = require("../config/database");
const User = require("./user");
const Event = require("./event");
const Atendees = require("./atendees");

User.hasMany(Event, { foreignKey: "firebaseUid", sourceKey: "firebaseUid" });
Event.belongsTo(User, { foreignKey: "firebaseUid", targetKey: "firebaseUid" });
// Atendees.belongsToMany(User, {through: "Atendees", foreignKey: "eventId", otherKey:"firebaseUid"})
// Atendees.belongsToMany(Event, {through: "Atendees", foreignKey: "firebaseUid", otherKey:"eventId"})

module.exports = { sequelize, User, Event, Atendees };
