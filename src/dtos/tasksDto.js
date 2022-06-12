const UserDTO = require("./userDto")
const dateParse = require('../utils/dateParse')
const moment = require('moment')
const CommentDTO = require("./commentDto")

module.exports = class TaskDto {
  constructor(taskInstance) {
      this.id = taskInstance.id
      this.title = taskInstance.title
      this.description = taskInstance.description
      this.status = taskInstance.status
      this.category = taskInstance.CategoryId
      this.created = dateParse(taskInstance.createdAt)
      this.deadline = moment(taskInstance.deadline).format('LL')
      this.image = taskInstance.image
      this.location = taskInstance.location
      if(taskInstance.Creator) {
        this.creator = {
          id: taskInstance.Creator.id,
          first_name: taskInstance.Creator.first_name,
          last_name: taskInstance.Creator.last_name,
          role: taskInstance.Creator.role,
          rating: taskInstance.Creator.rating,
          avatar: taskInstance.Creator.avatar
        }
      }
      if(taskInstance.Tags?.length) this.tags = taskInstance.Tags.map(tag => tag.id)
      if(taskInstance.createdAt < taskInstance.updatedAt) this.updated = dateParse(taskInstance.updatedAt)
      if(taskInstance.Comments?.length) this.comments = taskInstance.Comments.map(comment => new CommentDTO(comment))
  }
}
