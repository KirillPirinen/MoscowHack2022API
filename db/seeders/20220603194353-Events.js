'use strict';
const moment = require('moment')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Events', 
    [
      {
        title: 'Волонтерский корпус Международной Премии #МыВместе',
        description: 'Волонтерский корпус Международной Премии #МыВместе - сообщество неравнодушных граждан, готовых помочь в реализации крупнейшей Премии в России. Премия #МЫВМЕСТЕ - для НКО, бизнеса и добровольцев. В рамках нее',
        participants_count: 1
      },
      {
        title: 'Событие 1',
        description: 'Описание 1',
      },
      {
        title: 'Событие 1',
        description: 'Описание 1',
        participants_count: 1
      },
      {
        title: 'Событие 1',
        description: 'Описание 1',
      },
      {
        title: 'Событие 1',
        description: 'Описание 1',
      },
      {
        title: 'Событие 1',
        description: 'Описание 1',
      },
      {
        title: 'Событие 1',
        description: 'Описание 1',
      },
      {
        title: 'Событие 1',
        description: 'Описание 1',
      },
      {
        title: 'Событие 1',
        description: 'Описание 1',
      },
      {
        title: 'Событие 1',
        description: 'Описание 1',
      },
      {
        title: 'Событие 1',
        description: 'Описание 1',
      },
      {
        title: 'Событие 1',
        description: 'Описание 1',
      },
      {
        title: 'Событие 1',
        description: 'Описание 1',
      },
      {
        title: 'Событие 1',
        description: 'Описание 1',
      },
      {
        title: 'Событие 1',
        description: 'Описание 1',
      },
    ].map(setDate), {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Events', null, {});
  }

};

let date = moment();

function setDate (event, index) {
    if(index % 4 === 0) date = date.add(1, 'day')
    const calculatedDate = date.add(2, 'hour').toDate()
    return { 
      participants_count: 0,
      ...event, 
      date: calculatedDate,
      createdAt: new Date(),
      updatedAt: new Date()
    }
}
