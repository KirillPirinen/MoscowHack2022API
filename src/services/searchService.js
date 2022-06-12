const { first } = require('lodash');
const { Tasks, Users, Tags, Sequelize: { Op } } = require('../../db/models');

module.exports = class SearchService {
  static async findTasksByString(string) {
    
    let condition = [{ title: { [Op.iLike]: `%${string}%` } }, { description: { [Op.iLike]: `%${string}%` } }, { '$Tags.id$': { [Op.iLike]: `%${string}%` } }]

    if(/\s/.test(string)) {
      condition = string.split(' ').reduce((acc, word) => {
        acc.push({ title: { [Op.iLike]: `%${word}%` } }, { description: { [Op.iLike]: `%${word}%` } }, { '$Tags.id$': { [Op.iLike]: `%${word}%` } })
        return acc
      }, [])
    }

    return await Tasks.findAll({
      where: {
        [Op.or]: condition,
        [Op.and]: {
          status: 'Search'
        }
      }, 
      include: [{
        model: Tags
      }, {
        attributes: ['first_name', 'avatar', 'id', 'rating', 'last_name'],
        model: Users, as: 'Creator',
      }]
    })
  }
}
