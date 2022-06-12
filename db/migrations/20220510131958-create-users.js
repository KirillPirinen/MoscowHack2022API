'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      phone: {
        allowNull:true,
        unique:true,
        type: Sequelize.STRING
      },
      email: {
        allowNull:false,
        unique:true,
        type: Sequelize.STRING
      },
      password: {
        allowNull:false,
        type: Sequelize.STRING
      },
      role: {
        allowNull:false,
        type: Sequelize.ENUM('volunteer', 'non-profit', 'commercial', 'moderator', 'admin')
      },
      bio: {
        type: Sequelize.TEXT
      },
      avatar: {
        type: Sequelize.STRING,
        defaultValue: 'https://анучинский.рф/upload/iblock/0a5/0a547b9983be1d890e6b8fe5d230b3e3.jpeg'
      },
      rating: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      rated_times: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      sex: {
        allowNull:false,
        type: Sequelize.ENUM('male', 'female')
      },
      is_confirmed: {
        allowNull:false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
