const UserDTO = require("./userDto")
const dateParse = require('../utils/dateParse')

module.exports = class ReviewDTO {
  constructor(reviewInstance) {
      this.id = reviewInstance.id
      this.review = reviewInstance.review
      this.score = reviewInstance.score
      this.created = dateParse(reviewInstance.createdAt)
      if(reviewInstance.createdAt < reviewInstance.updatedAt) this.updated = dateParse(reviewInstance.updatedAt)
      if(reviewInstance.Reviewer) this.creator = {
        first_name: reviewInstance.Reviewer.first_name,
        last_name: reviewInstance.Reviewer.last_name,
        avatar: reviewInstance.Reviewer.avatar
      }
  }
}
