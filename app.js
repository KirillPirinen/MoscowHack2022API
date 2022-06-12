require('dotenv').config()
require('moment/locale/ru')
const express = require('express')
const app = express()
const logger = require('./src/utils/logger')
const cors = require('cors')
const serverrc = require('./.serverrc')
const rootRouter = require('./src/routes')
const errorHandler = require('./src/middleware/errorHandler')
const path = require('path')
const { isDev } = require('./src/utils/constants')
const ApiError = require('./src/errors/apiError')

app.use(logger())
app.use(cors(serverrc.cors))
app.use(express.static(path.resolve(process.env.PWD, 'public')))
app.use(express.json())

app.use(`/api/${serverrc.api.version}`, rootRouter)

app.all('*', (req, res, next) => isDev ? res.json({ info: '404 нет такого пути' }) : next(ApiError.BadRequest()))

app.use(errorHandler);

app.listen(serverrc.api.PORT, () => {
  console.log(`Server has been started on port ${serverrc.api.PORT}`)
})

