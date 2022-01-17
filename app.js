const config = require('./utils/config')
const express = require('express')
const app = express()
const videoRouter = require('./controllers/video')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI)
    .then(() => logger.info('db connected'))
    .catch(error => logger.error(error))

app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/users', usersRouter)
app.use('/api/videos', videoRouter)
app.use('/api/login', loginRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
