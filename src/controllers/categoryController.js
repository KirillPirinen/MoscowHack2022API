const { Categories, Sequelize: { Op } } = require("../../db/models")
const CategoryDTO = require('../dtos/categoryDto')
const methodsWrapper = require("../utils/helpers/methodsWrapper")

class CategoryController {

  getCategoryInfo = async (req, res) => {
    const { id } = req.params

    if(id) {
      const rawCat = await Categories.findOne({include:req.include, where: { id }})
      const parsedCat = new CategoryDTO(rawCat)
      return res.json(parsedCat)
    }

    // const rawOrgs = await Organizations.findAll({...req.searchParams, include:req.include })
    // const parsedOrgs = rawOrgs.map(org => new OrganizationDto(org))
    // return res.json(parsedOrgs)
  }

}

module.exports = methodsWrapper(new CategoryController())
