const moment = require('moment')
'use strict';

const StubTask = {
  title: 'Фестиваль животных из приютов "Путь домой"',
  description: 'Найти кошачьего и собачьего друга проще простого! Приюты и кураторы привезут животных...',
  deadline: moment().add(1, 'day').format(),
  status: 'Search',
  UserId: 1,
  CategoryId: 'animals',
  location: 'Москва',
  createdAt: new Date(),
  updatedAt: new Date()
}

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Tasks', [
      StubTask,
    {
      ...StubTask,
      title: 'Акция по сбору корма для приютов с животными',
      description: 'В университете ИТМО пройдет акция по сбору корма  для приютов с животными....',
    },
    {
      ...StubTask,
      title: 'Акция "Мохнатый друг"',
      description: 'Участие в акции "Мохнатый друг" проводится в нашей школе регулярно. Мы собираем корм, ткань для домиков животных, лекарства и бинты.',
    },
    {
      ...StubTask,
      title: 'Акция "Помоги участнику ВОВ"',
      description: 'Стань верной опорой',
      UserId: 2,
      CategoryId: 'elder'
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tasks', null, {});
  }
};
