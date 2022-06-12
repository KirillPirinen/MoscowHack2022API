const { Organizations, Sequelize: { Op } } = require("../../db/models")
const OrganizationDto = require('../dtos/organizationDto')
const methodsWrapper = require("../utils/helpers/methodsWrapper")

class OrganizationController {

  getOrganizationInfo = async (req, res) => {
    const { id } = req.params

    if(id) {
      const rawOrg = await Organizations.findOne({include:req.include, where: { id }})
      console.log(rawOrg)
      const parsedOrg = new OrganizationDto(rawOrg)
      return res.json(parsedOrg)
    }

    const rawOrgs = await Organizations.findAll({...req.searchParams, include:req.include })
    const parsedOrgs = rawOrgs.map(org => new OrganizationDto(org))
    return res.json(parsedOrgs)
  }

}

module.exports = methodsWrapper(new OrganizationController())
