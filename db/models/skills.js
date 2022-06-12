'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Skills extends Model {
    static associate({ Users, Tasks }) {
      this.belongsToMany(Users, {
        through: 'UsersSkills',
        foreignKey: 'skill_id',
      });
      this.belongsToMany(Tasks, {
        through: 'TasksSkills',
        foreignKey: 'skill_id',
      });
    }
  }
  Skills.init(
    {
      id: { primaryKey: true, type: DataTypes.STRING },
      skill: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Skills',
    }
  );
  return Skills;
};
