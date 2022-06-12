'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organizations extends Model {
    static associate({Users}) {
      this.belongsTo(Users, {
        foreignKey: 'UserId',
      });
    }
  }
  Organizations.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      logo: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Organizations',
    }
  );
  return Organizations;
};
