const UserDTO = require('./userDto')
const dateParse = require('../utils/dateParse')

module.exports = class OrganizationDto {
  constructor(orgInstance) {
      this.id = orgInstance.id
      this.name = orgInstance.name
      this.logo = orgInstance.logo
      this.description = orgInstance.description
      this.created = dateParse(orgInstance.createdAt)
      if(orgInstance.createdAt < orgInstance.updatedAt) this.updated = dateParse(orgInstance.updatedAt)
  }
}
