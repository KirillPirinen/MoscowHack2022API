'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Events extends Model {
    static associate({ Users, UsersEvents }) {
      this.belongsToMany(Users, { through: UsersEvents, foreignKey: 'event_id' })
    }
  }
  Events.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    participants_count: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Events',
  });
  return Events;
};
