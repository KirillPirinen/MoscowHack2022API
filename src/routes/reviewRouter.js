const { param, body } = require('express-validator')
const { validation } = require('../errors/errorMsg')
const reviewRouter = require('express').Router()

reviewRouter

.get('/:receiver_id', param('receiver_id').not().isEmpty().isNumeric().toInt(), reviewRouter.getAllByRoleId)

.post('/:receiver_id', 
param('receiver_id').not().isEmpty().isNumeric().toInt(),
body('score').not().isEmpty().isNumeric().toFloat().withMessage(validation.score),
body('review').if(body('review').exists()).trim().not().isEmpty().withMessage(validation.review),
reviewRouter.add)

.put('/:id',
checkRightsByOwnerId('Reviews', 'user_id', "Вы не можете редактировать чужую оценку"),
picker(['review, score']),
body('score').if(body('score').exists()).not().isEmpty().isNumeric().toFloat().withMessage(validation.score),
body('review').if(body('review').exists()).trim().not().isEmpty().withMessage(validation.review),
reviewRouter.update)

.delete('/:id', 
checkRightsByOwnerId('Reviews', 'user_id', "Вы не можете удалить чужую оценку"), 
reviewRouter.delete)

module.exports = reviewRouter
