const { DataTypes, NOW } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");
const Event = require("./event");

const Atendees = sequelize.define("Atendees", {
  joined_at: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  is_host: DataTypes.BOOLEAN,
});

Atendees.belongsTo(User, { foreignKey: "id", sourceKey: "id" });
Atendees.belongsTo(Event, { foreignKey: "eventId", sourceKey: "eventId" });

module.exports = Atendees;
