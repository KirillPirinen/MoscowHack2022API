const userController = require('../controllers/userController')
const { body } = require('express-validator')
const serverrc = require('../../.serverrc')
const userRouter = require('express').Router()
const { validation } = require('../errors/errorMsg')
const toTitled = require('../utils/helpers/toTitled')
const queryToInclude = require('../middleware/queryToInclude')
const upload = require('../middleware/uploadMulter')
const picker = require('../middleware/picker')

userRouter

.get('/', queryToInclude(['Tokens', 'Confirmations', 'Organizations']), userController.getUserInfo)

.put('/', picker(['sex', 'first_name', 'last_name', 'bio', 'email', 'password', 'phone', 'avatar']),
body('sex').if(body('sex').exists()).trim().custom(val => val === 'male' || val === 'female').withMessage(validation.sex),
body('first_name').if(body('first_name').exists()).trim().not().isEmpty().customSanitizer(toTitled).withMessage(validation.first_name),
body('last_name').if(body('last_name').exists()).trim().not().isEmpty().customSanitizer(toTitled).withMessage(validation.last_name),
body('bio').if(body('bio').exists()).trim().not().isEmpty().withMessage(validation.bio),
body('email').if(body('email').exists()).trim().normalizeEmail().isEmail().withMessage(validation.email), 
body('password').if(body('password').exists()).trim().isLength(serverrc.validator.password).withMessage(validation.passwordLen), 
body('phone').if(body('phone').exists()).trim().isMobilePhone('ru-RU').withMessage(validation.phone),
body('avatar').if(body('avatar').exists()).trim().isURL({ require_protocol: true }).withMessage(validation.photoPath),
userController.editUserData)

.patch('/', upload.single('avatar'), userController.uploadAvatar)

module.exports = userRouter
