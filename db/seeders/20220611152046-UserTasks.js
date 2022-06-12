'use strict';

const meta = { createdAt: new Date(), updatedAt: new Date() }

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('UserTasks', [
      {
        UserId: 1,
        TaskId: 1,
        ...meta
      },
      {
        UserId: 2,
        TaskId: 2,
        ...meta
      },
      {
        UserId: 2,
        TaskId: 3,
        ...meta
      },
  ], {});
  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserTasks', null, {});
  }
};
