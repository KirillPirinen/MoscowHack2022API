'use strict';

const meta = { createdAt: new Date(), updatedAt: new Date() }

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('TasksTags', [
      {
      TaskId: 1,
      tag_id: 'кошечки',
      ...meta
      },
      {
        TaskId: 1,
        tag_id: 'собачки',
        ...meta
      },
      {
        TaskId: 2,
        tag_id: 'животные',
        ...meta
      },
      {
        TaskId: 3,
        tag_id: 'старики',
        ...meta
      },
      
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('TasksTags', null, {});
  }
};
