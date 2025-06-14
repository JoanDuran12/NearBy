const sequelize = require('../config/database');
const User = require('./user');
const Event = require('./event');

User.hasMany(Event, { foreignKey: 'userId' });
Event.belongsTo(User, { foreignKey: 'userId' });

module.exports = { sequelize, User, Event };
