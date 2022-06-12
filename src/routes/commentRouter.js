const { param, body } = require('express-validator')
const commentController = require('../controllers/commentController')
const { validation } = require('../errors/errorMsg')
const checkRightsByOwnerId = require('../middleware/checkRightsByOwnerId')
const commentRouter = require('express').Router()

commentRouter

.get('/:task_id', param('task_id').not().isEmpty().isNumeric().toInt(),
commentController.getAllByTaskId)

.post('/:task_id', 
param('task_id').not().isEmpty().isNumeric().toInt(), 
body('comment').trim().not().isEmpty().withMessage(validation.comment), 
commentController.add)

.delete('/:id', 
checkRightsByOwnerId('Comments', 'user_id', "Вы не можете удалить чужой комментарий"), 
commentController.delete)

.put('/:id',
checkRightsByOwnerId('Comments', 'user_id', "Вы не можете редактировать чужой комментарий"),
body('comment').trim().not().isEmpty().withMessage(validation.comment), 
commentController.update)

module.exports = commentRouter
