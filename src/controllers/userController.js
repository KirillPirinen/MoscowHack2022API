const methodsWrapper = require("../utils/helpers/methodsWrapper")
const UserDTO = require("../dtos/userDto");
const checkValidationErrors = require("../utils/helpers/checkValidationErrors");
const UserService = require("../services/userService");
const ApiError = require("../errors/apiError");
const _ = require('lodash');
const fieldNameToHumanReadable = require("../utils/helpers/fieldNameToHumanReadable");
const { auth } = require('../errors/errorMsg')
const { Users, Tasks, Events, Reviews } = require('../../db/models')

class UserController {

  getUserInfo = async (req, res) => {
    const user = await Users.findOne({ where: { id: req.user.id }, include: [
      {model: Tasks, as: 'Volunteer'},
      {model: Tasks, as: 'Creator'},
      {model: Events },
      { model: Reviews, as: 'Reciever', include: { model: Users, as: 'Reviewer' } },
      ...req.include] })
    return res.json(new UserDTO(user))
  }
  
  uploadAvatar = async (req, res) => {
    if (!req.file) throw ApiError.BadRequest()
      const avatar = await UserService.uploadUserAvatar(req.user.id, req.file.filename)
      return res.json({ avatar })
  }

  editUserData = async (req, res) => {
    checkValidationErrors(req)
    
    const { password, ...rest } = req.body

      if(password) {

        const isUpdated = await UserService.updateUserPassword(req.user.id, password)
        if(!isUpdated) throw new ApiError(403, 'Не удалось обновить пароль')
        return res.sendStatus(200)

      }  
      
      if(_.isEmpty(rest)) throw new ApiError(403, 'Вы не изменили никаких данных')

      if(rest.hasOwnProperty('phone') || rest.hasOwnProperty('email')) {
        const [existedUser, coincidence] = await UserService.checkUser(rest.email, rest.phone)

        if (existedUser) throw new ApiError(403, auth.userAlreadyExists(coincidence, existedUser))
      }

      const isUpdated = await UserService.updateUserData(req.user.id, rest)

      if(!isUpdated) {
        throw new Error()
      }

      const message = fieldNameToHumanReadable(rest)

      return res.json({ info: `Ваши данные(${message.join(', ')}) успешно изменены` })
  }

}

module.exports = methodsWrapper(new UserController())
