const UserDTO = require("./userDto")
const dateParse = require('../utils/dateParse')
const moment = require('moment')

module.exports = class EventDto {
  constructor(eventInstance) {
      this.id = eventInstance.id
      this.title = eventInstance.title
      this.description = eventInstance.description
      this.participants_count = eventInstance.participants_count || 0
      this.created = dateParse(eventInstance.createdAt)
      this.date = moment(eventInstance.date).format('LL')
      this.time = moment(eventInstance.date).format('LT')
      this.expired = moment().isAfter(eventInstance.date)
      if(eventInstance.createdAt < eventInstance.updatedAt) this.updated = dateParse(eventInstance.updatedAt)
      if(eventInstance.Users?.length) this.participants = eventInstance.Users.map(participiant => 
        (
          {
            first_name: participiant.first_name,
            email: participiant.email,
            avatar: participiant.avatar
          }
        )
      )
  }
}
