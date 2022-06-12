const { Events, Users, UsersEvents, Sequelize: { Op }, sequelize } = require("../../db/models")
const EventDto = require("../dtos/eventDto")
const ApiError = require("../errors/apiError")
const methodsWrapper = require("../utils/helpers/methodsWrapper")

class EventConroller {

  getEvents = async (req, res) => {
    const { id } = req.params

    if(id) {
      const rawEvent = await Events.findOne({include:req.include, where: { id }})
      const parsedEvent = new EventDto(rawEvent)
      return res.json(parsedEvent)
    }

    const rawEvents = await Events.findAll({...req.searchParams, include:req.include })
    const parsedEvents = rawEvents.map(event => new EventDto(event))
    return res.json(parsedEvents)
  }

  getCalendarEvents = async (req, res) => {
    const rawEvents = await Events.findAll({ include: {model: Users}, order:[['date', 'ASC']], where: {
      date: {
        [Op.between]: [sequelize.literal('CURRENT_DATE'), sequelize.literal("CURRENT_DATE + INTERVAL '4 days'")],
       }
    }})
    const parsedEvents = rawEvents.map(event => new EventDto(event))
    return res.json(parsedEvents)
  }

  subscribeEvent = async (req, res) => {
    const { id: user_id } = req.user
    const { event_id } = req.params

    await sequelize.transaction(async (t) => {

      const [userEventInstance, isCreated] = await UsersEvents.findOrCreate({
        where: { 
          [Op.and]: [ { user_id }, { event_id } ] 
        },
        defaults: { user_id, event_id },
        transaction: t
      })
      
      if(!isCreated) throw new ApiError(403, 'Вы уже подписывались на данное событие')

      await Events.increment({ participants_count: 1 }, { where: { id: event_id } }, { transaction: t })
    })

    return res.json({ info: { message: 'Вы успешно подписались на событие' }})
  }

  unsubscribeEvent = async (req, res) => {
    const { id: user_id } = req.user
    const { event_id } = req.params

    await sequelize.transaction(async (t) => {
      const count = await UsersEvents.destroy({
        where: { 
          [Op.and]: [ { user_id }, { event_id } ] 
        }
      })
      
      if(!count) throw new ApiError(403, 'Вы не подписаны на это событие')

      await Events.decrement({ participants_count: 1 }, { where: { id: event_id } }, { transaction: t })
    })

    return res.json({ info: { message: 'Вы успешно отписались от события' }})
  }

}

module.exports = methodsWrapper(new EventConroller())
