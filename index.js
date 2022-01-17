const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT)
logger.info('http://127.0.0.1:3001')
