const UserDTO = require("./userDto")
const dateParse = require('../utils/dateParse')

module.exports = class CommentDTO {
  constructor(commentInstance) {
      this.id = commentInstance.id
      this.comment = commentInstance.comment
      this.created = dateParse(commentInstance.createdAt)
      if(commentInstance.createdAt < commentInstance.updatedAt) this.updated = dateParse(commentInstance.updatedAt)
      if(commentInstance.User) this.creator = {
        first_name: commentInstance.User.first_name,
        last_name: commentInstance.User.last_name,
        avatar: commentInstance.User.avatar,
        id: commentInstance.User.id
      }
  }
}
