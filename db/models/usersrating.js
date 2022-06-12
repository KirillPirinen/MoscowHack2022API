'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsersRating extends Model {
    static associate(models) {
      // define association here
    }
  }
  UsersRating.init({
    rating_owner_id: DataTypes.INTEGER,
    reviewer_id: DataTypes.INTEGER,
    grade: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UsersRating',
  });
  return UsersRating;
};
