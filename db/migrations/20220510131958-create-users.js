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
        defaultValue: 'https://cdnn21.img.ria.ru/images/07e6/03/0f/1778210054_0:0:2778:1563_1920x0_80_0_0_7f2dc749e8344dfd222575ae3a475fd5.jpg.webp'
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
