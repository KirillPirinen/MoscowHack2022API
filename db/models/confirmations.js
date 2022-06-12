'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Confirmations extends Model {
    static associate({Users}) {
      this.belongsTo(Users, {
        foreignKey: 'UserId',
      });
    }
  }
  Confirmations.init({
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Confirmations',
  });
  return Confirmations;
};
