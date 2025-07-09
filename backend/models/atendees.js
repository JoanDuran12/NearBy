const { DataTypes, NOW } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");
const Event = require("./event");

const Atendees = sequelize.define("Atendees", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  isHost: DataTypes.BOOLEAN,
  firebaseUid: {
    type: DataTypes.STRING,
  },
  eventId: {
    type: DataTypes.INTEGER,
    references: {
      model: Event,
      key: "eventId",
    },
  },
});

// Atendees.belongsTo(User, { foreignKey: "userId" });
// Atendees.belongsTo(Event, { foreignKey: "eventId" });

module.exports = Atendees;
