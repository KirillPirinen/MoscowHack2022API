const bcrypt = require('bcrypt')
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        first_name: 'John',
        last_name: 'Doe',
        phone: '79999999999',
        email: '1@mail.com',
        password: await bcrypt.hash('123456', 4),
        role: 'volunteer',
        bio: 'pes dvoroviy',
        avatar: 'https://avatars.githubusercontent.com/u/46349061?v=4',
        rating: 3.4,
        sex: 'male',
        is_confirmed: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        first_name: 'Liza',
        last_name: 'Alert',
        phone: '79999999992',
        email: '2@mail.com',
        password: await bcrypt.hash('123456', 4),
        role: 'non-profit',
        bio: 'pes dvoroviy',
        avatar: 'https://avatars.githubusercontent.com/u/46349061?v=4',
        rating: 2,
        sex: 'male',
        is_confirmed: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
