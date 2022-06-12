const authController = require('../controllers/authController')
const { body, param } = require('express-validator')
const serverrc = require('../../.serverrc')
const authRouter = require('express').Router()
const { validation } = require('../errors/errorMsg')
const toTitled = require('../utils/helpers/toTitled')
const isRoleRegistrebale = require('../utils/helpers/isRoleRegistrebale')
const cookieParser = require('cookie-parser')()

authRouter

.get('/refresh', cookieParser, authController.refreshAuth)

.get('/activation/:uuid', 
  param('uuid').isUUID('4'),
  authController.confirmEmail
)

.post('/signin',
  body('email').trim().normalizeEmail().isEmail().withMessage(validation.email), 
  body('password').trim().isLength(serverrc.validator.password).withMessage(validation.passwordLen),
  authController.signIn
)

.post('/signup',
  body('sex').trim().custom(val => val === 'male' || val === 'female').withMessage(validation.sex),
  body('role').trim().not().isEmpty().withMessage(validation.role).custom(isRoleRegistrebale).withMessage(validation.invalidRole),
  body('first_name').trim().not().isEmpty().customSanitizer(toTitled).withMessage(validation.first_name),
  body('email').trim().normalizeEmail().isEmail().withMessage(validation.email), 
  body('password').trim().isLength(serverrc.validator.password).withMessage(validation.passwordLen), 
  body('phone').if(body('phone').exists()).trim().isMobilePhone('ru-RU').withMessage(validation.phone),
  authController.signUp
)

.get('/signout', cookieParser, authController.signOut)

module.exports = authRouter
