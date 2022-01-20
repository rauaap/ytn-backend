const https = require('https')
const fs = require('fs')
const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

console.log(config.KEY_PATH, config.CERT_PATH)

const server = https.createServer({
    key: fs.readFileSync(config.KEY_PATH),
    cert: fs.readFileSync(config.CERT_PATH),
    passphrase: config.PASSPHRASE
}, app)

server.listen(config.PORT)
logger.info(`http://127.0.0.1:${config.PORT}`)
