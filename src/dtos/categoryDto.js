const UserDTO = require("./userDto")
const dateParse = require('../utils/dateParse')

module.exports = class CategoryDTO {
  constructor(reviewInstance) {
      this.id = reviewInstance.id
      this.text = reviewInstance.text
      this.description = reviewInstance.description
  }
}
