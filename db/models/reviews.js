'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
    static associate({ Users }) {
      this.belongsTo(Users, {
        as: 'Reviewer',
        foreignKey: 'user_id'
      })
      this.belongsTo(Users, {
        as: 'Reciever',
        foreignKey: 'receiver_id'
      })
    }
  }
  Reviews.init({
    review: DataTypes.TEXT,
    score: DataTypes.FLOAT,
    user_id: DataTypes.INTEGER,
    receiver_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Reviews',
  });
  return Reviews;
};
