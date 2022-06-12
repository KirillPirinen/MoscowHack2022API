'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Categories', [
      {
        id: 'children',
        text: 'Дети',
        description: 'Цветы жизни',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'animals',
        text: 'Животные',
        description: 'В данном разделе представлены актальные задачи помощи нашим пушистым друзьям',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'law',
        text: 'Права человека',
        description:'Помогите нуждающимся в юридической помощи',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'nature',
        text: 'Природа',
        description: 'Окружающая среда тоже нуждается в бережливом отношении',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'missing',
        text: 'Поиск пропавших',
        description: 'Лиза алерт на минималках',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'sport',
        text: 'Спорт и события',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'coronavirus',
        text: 'Коронавирус',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'elder',
        text: 'Пожилые и ветераны',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'health',
        text: 'Здравоохранение',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'incident',
        text: 'ЧС',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'other',
        text: 'Остальное',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Categories', null, {});
  },
};
