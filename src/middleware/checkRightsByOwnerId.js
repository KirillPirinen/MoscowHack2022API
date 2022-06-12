const models = require('../../db/models')
const ApiError = require('../errors/apiError')
const safeMiddleware = require('../utils/helpers/safeMiddleware')

module.exports = (modelName, fieldToCheck, message) => safeMiddleware(async (req, res, next) => {
  if(!req.params?.id) throw ApiError.BadRequest()

  const existed = await models[modelName]?.findByPk(req.params.id)
  
  if(!existed) throw ApiError.BadRequest('Ресурс не найден')
  if(!(existed[fieldToCheck] === req.user.id)) throw new ApiError(403, message)
  
  res.locals[modelName] = existed

  next()
})
