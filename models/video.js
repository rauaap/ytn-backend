const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

const videoSchema = new mongoose.Schema({
    videoId: {
        type: String,
        required: true,
        match: [
            /^[0-9A-Za-z_-]{10}[048AEIMQUYcgkosw]$/,
            'not a valid videoID'
        ]
    },
    user: {
        type: String,
        required: true,
        match: /[0-9A-Za-z_]{3,20}/,
        minLength: 3,
        maxLength: 20
    },
    date: Date,
})

videoSchema.set('toJSON', {
    transform: (doc, returnedObject) => {
        returnedObject.id = doc._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Video', videoSchema)
