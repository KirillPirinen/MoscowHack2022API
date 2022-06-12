const categoryController = require('../controllers/categoryController')
const queryGetParamsMiddleware = require('../middleware/queryGetParams')
const queryToInclude = require('../middleware/queryToInclude')
const categoryRouter = require('express').Router()

categoryRouter

.get('/:id?', queryToInclude(['Users']), queryGetParamsMiddleware({ model: 'Category' }), categoryController.getCategoryInfo)

module.exports = categoryRouter
