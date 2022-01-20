require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const SECRET = process.env.SECRET
const CERT_PATH = process.env.CERT_PATH
const KEY_PATH = process.env.KEY_PATH
const PASSPHRASE = process.env.PASSPHRASE

module.exports = {
    PORT,
    MONGODB_URI,
    SECRET,
    CERT_PATH,
    KEY_PATH,
    PASSPHRASE
}
