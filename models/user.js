mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        match: /^[0-9A-Za-z_]{3,20}$/,
        minLength: 3,
        maxLength: 20,
        unique: true,
        uniqueCaseInsensitive: true,
    },
    passwordHash: String,
})
userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (doc, returnedObject) => {
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

module.exports = mongoose.model('User', userSchema)
