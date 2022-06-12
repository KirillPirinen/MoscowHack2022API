const { Users, Sequelize: { Op }, Confirmations, sequelize } = require('../../db/models')
const TokenService = require('./tokenService')
const serverrc = require('../../.serverrc')
const ApiError = require('../errors/apiError')
const { auth } = require('../errors/errorMsg')
const bcrypt = require('bcrypt')
const { v4 } = require('uuid')
const startChild = require('../utils/startChild')
const { foldersMap } = require('../utils/constants')
const resolveStaticPath = require('../utils/resolveStaticPath')

module.exports = class UserService {
  static checkUser = async (email, phone) => {
    const result = [null, null]; // [0] -> найденный инстанс юзера [1] по какому критерию найден (имейл или телефон)
    const uncodedPhone = phone?.slice(1);

    result[0] = await Users.findOne({
      where: {
        [Op.or]: [
          { email: { [Op.like]: email } },
          { phone: { [Op.like]: `%${uncodedPhone}` } },
        ],
      },
    });

    if (result[0]) {
      result[1] = result[0].email === email ? 'email' : 'phone';
    }

    return result;
  };

  static async login({ id, email, role }, fingerprint) {
    const accessToken = TokenService.generateAccessToken({
      id,
      email,
      role,
    });

    const refreshToken = TokenService.generateRefreshToken({ fingerprint });

    await TokenService.saveToken(id, refreshToken);

    return { refreshToken, accessToken };
  }

  static async registration(
    { password, first_name, email, last_name, role, sex, org_name = "Animal Rescue" },
    fingerprint
  ) {
    const hashPassword = await bcrypt.hash(password, serverrc.encryption.salt);

    const newUser = await sequelize.transaction(async (t) => {

      const newUser = await Users.create({
        password: hashPassword,
        first_name,
        email,
        last_name,
        role,
        sex,
      }, { transaction: t } );

      if(role === 'non-profit' || role === 'commercial' ) {
        await newUser.createOrganization({ name: org_name }, { transaction: t })
      }
      
      return newUser
    })
    

    const accessToken = TokenService.generateAccessToken({
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
    });

    const refreshToken = TokenService.generateRefreshToken({ fingerprint });

    await TokenService.saveToken(newUser.id, refreshToken);

    return { newUser, accessToken, refreshToken };
  }

  static async sendConfirmation(userInstance) {
    try {
      const confirmLink = await userInstance.createConfirmation({ id:v4(), user_id: userInstance.id });
      const info = await MailService.sendEmail(userInstance.email, "Подтверждение адреса электронной почты", activationMessage(confirmLink.id))

      return info

    } catch(err) {
      console.log(`Не удалось создать или отправить ссылку на почту`, err)
    }
  }

  static async confirmEmail(uuid) {
    const confirmLink = await Confirmations.findByPk(uuid)
  
    if(!confirmLink) throw new ApiError(403, auth.confirmationNotFound)

    const [isUpdated] = await Users.update(
      { is_confirmed: true }, 
      { where: { id: confirmLink.user_id}}
    )
  
    if(isUpdated) {
        confirmLink.destroy()
    }

    return Boolean(isUpdated);
  }

  static updateUserPassword = async (id, rawPassword) => {
    const password = await bcrypt.hash(rawPassword, 4);
    return await Users.update({ password }, { where: { id } })
  }

  static updateUserData = async (id, props) => {
    let userInstance

    if(props.hasOwnProperty('avatar')) {
      userInstance = await Users.findByPk(id)
      if(!userInstance.avatar.startsWith('http')) {
        startChild([userInstance.avatar, foldersMap.avatar], 'deleteFile.js', 'DELETE')
      }
    }

    return userInstance ? await userInstance.update(props) : await Users.update(props, { where: { id } })
  
  }

  static uploadUserAvatar = async (id, filename) => {

    const user = await Users.findByPk(id)
    
    const prevAvatar = user.avatar
    user.avatar = filename

    await user.save()
    
    startChild([prevAvatar, foldersMap.avatar], 'deleteFile.js', 'DELETE')
    
    return resolveStaticPath(user.avatar, 'avatar')
  }

}
