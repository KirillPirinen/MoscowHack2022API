'use strict';

const meta = {
  createdAt: new Date(),
  updatedAt: new Date(),
  isDefault: true
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tags', [
      { id: 'животные', ...meta },
      { id: 'пожилые', ...meta },
      { id: 'старики', ...meta },
      { id: 'продукты', ...meta },
      { id: 'детдом', ...meta },
      { id: 'детишки', ...meta },
      { id: 'кошечки', ...meta },
      { id: 'собачки', ...meta },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tags', null, {});
  }
};
