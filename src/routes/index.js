const rootRouter = require('express').Router()
const { isDev } = require('../utils/constants')
const checkToken = require('../middleware/checkToken')
const authRouter = require('./authRouter')
const taskRouter = require('./taskRouter')
const userRouter = require('./userRouter')
const commentRouter = require('./commentRouter')
const eventRouter = require('./eventRouter')
const organizationRouter = require('./organizationRouter')
const categoryRouter = require('./categoryRouter')

if(isDev) {
  //Для тестирования фронта все руты отрабатывают с задержкой
  rootRouter.use('/', (req,res, next) => setTimeout(next, 500))
}

rootRouter.use('/tasks', taskRouter);
rootRouter.use('/auth', authRouter)
rootRouter.use('/event', eventRouter)
rootRouter.use('/user', checkToken, userRouter)
rootRouter.use('/comment', checkToken, commentRouter)
rootRouter.use('/organization', organizationRouter)
rootRouter.use('/category', categoryRouter)

module.exports = rootRouter
