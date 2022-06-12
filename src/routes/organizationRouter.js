const organizationController = require('../controllers/organizationController')
const queryGetParamsMiddleware = require('../middleware/queryGetParams')
const queryToInclude = require('../middleware/queryToInclude')
const organizationRouter = require('express').Router()

organizationRouter

.get('/:id?', queryToInclude(['Users']), queryGetParamsMiddleware({ model: 'Events' }), organizationController.getOrganizationInfo)

module.exports = organizationRouter
