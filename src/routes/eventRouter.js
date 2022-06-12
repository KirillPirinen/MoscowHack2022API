const eventController = require('../controllers/eventController')
const checkToken = require('../middleware/checkToken')
const queryGetParamsMiddleware = require('../middleware/queryGetParams')
const queryToInclude = require('../middleware/queryToInclude')
const eventRouter = require('express').Router()

eventRouter

.get('/calendar', eventController.getCalendarEvents)
.get('/:id?', queryToInclude(['Users']), queryGetParamsMiddleware({ model: 'Events' }), eventController.getEvents)
.patch('/:event_id', checkToken, eventController.subscribeEvent)
.delete('/:event_id', checkToken, eventController.unsubscribeEvent)

module.exports = eventRouter
