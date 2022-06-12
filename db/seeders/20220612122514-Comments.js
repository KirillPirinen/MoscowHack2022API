'use strict';

const meta = { 
  createdAt: new Date(), 
  updatedAt: new Date(),
  task_id: 1,
  user_id: 1,
}

const stub = new Array(10).fill(0).map((el, i) => ({...meta, comment: `Коммент № ${i + 1}` }))

module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.bulkInsert('Comments', 
  stub, 
  {});
  },

  async down (queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Comments', null, {});
    
  }
};
