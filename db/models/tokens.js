'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tokens extends Model {    
    static associate({Users}) {
      this.belongsTo(Users, {
        foreignKey: 'id'
      })
    }
  }
  Tokens.init({
    user_id: DataTypes.INTEGER,
    refreshToken: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Tokens',
  });
  return Tokens;
};
