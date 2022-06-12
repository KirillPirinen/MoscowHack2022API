const UserService = require("../services/userService")
const { compare } = require('bcrypt')
const ApiError = require('../errors/apiError')
const checkValidationErrors = require('../utils/helpers/checkValidationErrors')
const serverrc = require('../../.serverrc')
const TokenService = require("../services/tokenService")
const methodsWrapper = require("../utils/helpers/methodsWrapper")
const { auth } = require('../errors/errorMsg')
const UserDTO = require("../dtos/userDto")

class AuthController {
 
  refreshAuth = async (req, res) => { 
    const { refreshToken } = req.cookies
    const token = await TokenService.findTokenWithUser(refreshToken)
    
    if(!token) throw ApiError.UnauthorizedError()

    const tokenData = TokenService.validateToken(refreshToken)
    
    if(tokenData?.fingerprint !== req.get('User-Agent')) {
      res.clearCookie('refreshToken');
      throw ApiError.UnauthorizedError()
    }

    const { id, email, role } = token.User
    const accessToken = TokenService.generateAccessToken({ id, email, role })

    res.json({ accessToken })
  }

  signIn = async (req, res) => {
    checkValidationErrors(req)

    const { email, password, phone } = req.body
  
    const [ existedUser ] = await UserService.checkUser(email, phone)
    
    if (!existedUser) throw new ApiError(404, auth.userNotFound)

    if(await compare(password, existedUser.password)) {
      const { refreshToken, accessToken } = await UserService.login(existedUser, req.get('User-Agent')) 

      res.cookie('refreshToken', refreshToken, serverrc.cookie)

      return res.json(new UserDTO(existedUser, accessToken))

    } else {
      throw new ApiError(403, auth.wrongPassword)
    }

  }

  signUp = async (req, res) => {
    checkValidationErrors(req)

    const { email, phone } = req.body
    const [existedUser, coincidence] = await UserService.checkUser(email, phone)

    if (existedUser) throw new ApiError(403, auth.userAlreadyExists(coincidence, existedUser))

    const { newUser, refreshToken, accessToken } =  await UserService.registration(req.body, req.get('User-Agent'))
  
    res.cookie('refreshToken', refreshToken, serverrc.cookie)

    //UserService.sendConfirmation(newUser)

    return res.json(new UserDTO(newUser, accessToken))
    
  }

  signOut = async (req, res) => {
    const { refreshToken } = req.cookies;
    await TokenService.removeToken(refreshToken);
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
  }

  confirmEmail = async (req, res) => {
    checkValidationErrors(req)

    const { uuid } = req.params;
    
    const isUpdated = await UserService.confirmEmail(uuid)
    if(!isUpdated) throw new ApiError(403, auth.emailUnconfirmed)
    
    return res.json({ info: 'Ваша почта успешно подтвреждена' })
  }

}

module.exports = methodsWrapper(new AuthController())
