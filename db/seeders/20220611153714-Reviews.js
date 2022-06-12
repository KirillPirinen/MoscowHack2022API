'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.bulkInsert('Reviews', [
    { 
      user_id:2,
      receiver_id:1,
      score: 3.4, 
      createdAt: new Date(), 
      updatedAt: new Date() 
    }
  ], {});
  
  },

  async down (queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Reviews', null, {});
    
  }
};
