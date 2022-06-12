'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserTasks extends Model {
    static associate(models) {
      // define association here
    }
  }
  UserTasks.init(
    {
      TaskId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      is_confirmed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'UserTasks',
    }
  );
  return UserTasks;
};
