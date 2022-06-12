'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tags extends Model {
    static associate({ Tasks }) {
      this.belongsToMany(Tasks, {
        through: 'TasksTags',
        foreignKey: 'tag_id',
      });
    }
  }
  Tags.init(
    { id: { primaryKey: true, type: DataTypes.STRING }, 
      isDefault: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: 'Tags',
    }
  );
  return Tags;
};
