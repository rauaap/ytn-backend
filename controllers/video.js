const jwt = require('jsonwebtoken')
const videoRouter = require('express').Router()
const logger = require('../utils/logger')
const Video = require('../models/video')
const User = require('../models/user')

const getTokenFrom = (req) => {
    const auth = req.get('authorization')
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
        return auth.substring(7)
    }
    return null
}

const validateToken = (token) => {
    if (!token) {
        return
    }
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        return decodedToken
    }
    catch(err) {
        console.log(err)
        return
    }
}

const getUser = async (req) => {
    const token = getTokenFrom(req)
    const decodedToken = validateToken(token)
    if (!decodedToken) {
        return false
    }
    const user = await User.findById(decodedToken.id)
    return user
}

videoRouter.get('/', async (req, res) => {
    const user = await getUser(req)
    if (!user) {
        return res.status(401).json({error: 'token missing or invalid'})
    }
    Video.find({user: user.username}).then(videos => {
        res.json(videos)
    })
})

videoRouter.post('/', async (req, res, next) => {
    const {videoId} = req.body
    const user = await getUser(req)
    if (!user) {
        res.status(401).json({error: 'token missing or invalid'})
    }
    const video = new Video({
        videoId: videoId,
        date: new Date(),
        user: user.username
    })
    video.save()
        .then(video => res.json(video))
        .catch(error => next(error))
})

videoRouter.delete('/:id', async (req, res, next) => {
    const user = getUser(req)
    Video.findByIdAndRemove((req.params.id))
        .then(r => res.status(204).end())
        .catch(error => next(error))
})

module.exports = videoRouter
