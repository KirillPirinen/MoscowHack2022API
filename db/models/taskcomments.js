'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaskComments extends Model {
    static associate(models) {
      // define association here
    }
  }
  TaskComments.init(
    {
      TaskId: DataTypes.INTEGER,
      CommentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'TaskComments',
    }
  );
  return TaskComments;
};
