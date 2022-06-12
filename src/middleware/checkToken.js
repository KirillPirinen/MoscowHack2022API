const ApiError = require('../errors/apiError')
const TokenService = require('../services/tokenService')

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) throw ApiError.UnauthorizedError()
  
    const token = authHeader.split(' ')[1];
    const tokenData = TokenService.validateToken(token, 'access')

    if(!tokenData) throw ApiError.UnauthorizedError()

    req.user = tokenData

    next()
  } catch(err) {
    next(err)
  }  
}

