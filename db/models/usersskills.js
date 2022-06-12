'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsersSkills extends Model {    
    static associate(models) {
      // define association here
    }
  }
  UsersSkills.init(
    {
      UserId: DataTypes.INTEGER,
      skill_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'UsersSkills',
    }
  );
  return UsersSkills;
};
