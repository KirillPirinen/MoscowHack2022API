'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TasksSkills extends Model {
    static associate(models) {
      // define association here
    }
  }
  TasksSkills.init(
    {
      TaskId: DataTypes.INTEGER,
      skill_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'TasksSkills',
    }
  );
  return TasksSkills;
};
