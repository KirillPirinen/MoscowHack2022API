const taskRouter = require('express').Router()
const taskController = require('../controllers/taskController')
const checkToken = require('../middleware/checkToken')
const upload = require('../middleware/uploadMulter')
const { query, param } = require('express-validator')
const queryGetParamsMiddleware = require('../middleware/queryGetParams')
const queryToInclude = require('../middleware/queryToInclude')


taskRouter

.get('/search', 
query('text').trim().customSanitizer((value) => value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]|(?<=\s)\s/g, ''))
.notEmpty().withMessage('Введите корректную строку для поиска'),
taskController.findTasksByQuery)

.get('/category/:CategoryId', 
param('CategoryId').trim().notEmpty().withMessage('Не указана категория'), queryGetParamsMiddleware({ model: 'Tasks' }),
taskController.getAllTasksByCategory)

.get('/specific/:id?', queryToInclude(['Tags']), queryGetParamsMiddleware({ model: 'Tasks' }), taskController.getTasks)

.get('/', taskController.getAllUserTasks)
.post('/create', checkToken, upload.single('taskImg'), taskController.createNewTask)
.get('/getgategories', taskController.sendCategories)

module.exports = taskRouter
