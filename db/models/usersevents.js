'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsersEvents extends Model {
    static associate() {

    }
  }
  UsersEvents.init({
    user_id: DataTypes.INTEGER,
    event_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UsersEvents',
  });
  return UsersEvents;
};
