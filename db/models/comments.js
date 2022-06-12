'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    static associate({Users, Tasks}) {
      this.belongsTo(Users, {
        foreignKey: 'user_id',
      });
      this.belongsTo(Tasks, {
        foreignKey: 'task_id',
      });
    }
  }
  Comments.init({
    comment: DataTypes.TEXT,
    task_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};
