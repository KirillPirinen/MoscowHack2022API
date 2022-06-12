const resolveStaticPath = require("../utils/resolveStaticPath")
const EventDto = require("./eventDto")
const OrganizationDto = require("./organizationDto")
const ReviewDTO = require("./reviewDto")
const TaskDto = require("./tasksDto")

module.exports = class UserDTO {
  constructor(userInstance, accessToken) {
      this.id = userInstance.id
      this.first_name = userInstance.first_name
      this.last_name = userInstance.last_name
      this.phone = userInstance.phone
      this.email = userInstance.email
      this.role = userInstance.role
      this.bio = userInstance.bio
      this.avatar = resolveStaticPath(userInstance.avatar, 'avatar')
      this.rating = userInstance.rating
      this.sex = userInstance.sex
      this.accessToken = accessToken
      if(userInstance.Volunteer?.length) this.acceptedTasks = userInstance.Volunteer.map(task => new TaskDto(task))
      if(userInstance.Creator?.length) this.createdTasks = userInstance.Creator.map(task => new TaskDto(task))
      if(userInstance.Organization) this.organization = new OrganizationDto(userInstance.Organization)
      if(userInstance.Events?.length) this.events = userInstance.Events.map(event => new EventDto(event))
      if(userInstance.Reciever?.length) this.recieved_reviews = userInstance.Reciever.map(review => new ReviewDTO(review))
  }
}
