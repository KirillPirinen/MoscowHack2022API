'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {
    static associate({Users, Comments, Skills, Tags, Categories}) {
      this.belongsToMany(Users, {
        through: 'UserTasks',
        foreignKey: 'TaskId',
        as: 'Volunteer'
      });
      this.belongsTo(Users, {
        foreignKey: 'UserId',
        as: 'Creator'
      });
      this.hasMany(Comments, {
        foreignKey: 'task_id',
      });
      this.belongsToMany(Skills, {
        through: 'TasksSkills',
        foreignKey: 'TaskId',
      });
      this.belongsToMany(Tags, {
        through: 'TasksTags',
        foreignKey: 'TaskId',
      });
      this.belongsTo(Categories)
    }
  }
  Tasks.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      location: DataTypes.STRING,
      deadline: DataTypes.DATE,
      responses: DataTypes.INTEGER,
      status: DataTypes.ENUM(
        'Publication',
        'Search',
        'In work',
        'closure',
        'Reviews'
      ),
      UserId: DataTypes.INTEGER,
      CategoryId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Tasks',
    }
  );
  return Tasks;
};
