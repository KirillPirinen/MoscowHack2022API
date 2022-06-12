'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TasksTags extends Model {
    static associate(models) {
      // define association here
    }
  }
  TasksTags.init(
    {
      TaskId: DataTypes.INTEGER,
      tag_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'TasksTags',
    }
  );
  return TasksTags;
};
