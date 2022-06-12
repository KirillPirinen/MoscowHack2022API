'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate({Tasks, Comments, Skills, Reviews, UsersRating, Organizations, Confirmations, Tokens, UsersEvents, Events }) {

      this.hasOne(Tokens, {
        foreignKey: 'user_id',
      });

      this.hasMany(Tasks, {
        foreignKey: 'UserId',
        as: 'Creator'
      });
      
      this.belongsToMany(Tasks, {
        through: 'UserTasks',
        foreignKey: 'UserId',
        as: 'Volunteer'
      });
      this.hasMany(Comments, {
        foreignKey: 'user_id',
      });
      this.belongsToMany(Skills, {
        through: 'UsersSkills',
        foreignKey: 'UserId',
      });
      this.hasMany(Reviews, {
        as: 'Reviewer',
        foreignKey: 'user_id',
      });
      this.hasMany(Reviews, {
        as: 'Reciever',
        foreignKey: 'receiver_id',
      });

      this.hasOne(UsersRating, {
        foreignKey: 'reviewer_id',
      });

      this.hasOne(Organizations, {
        foreignKey: 'UserId',
      });

      this.hasOne(Confirmations, {
        foreignKey: 'UserId',
      });
      this.belongsToMany(Events, { through: UsersEvents, foreignKey: 'user_id' })
    }
  }
  Users.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.ENUM(
        'volunteer',
        'non-profit',
        'commercial',
        'moderator',
        'admin'
      ),
      bio: DataTypes.TEXT,
      avatar: DataTypes.STRING,
      rating: DataTypes.FLOAT,
      rated_times: DataTypes.INTEGER,
      sex: DataTypes.ENUM('male', 'female'),
      is_confirmed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Users',
    }
  );
  return Users;
};
