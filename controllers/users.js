const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (req, res, next) => {
    const body = req.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        passwordHash
    })
    user.save()
        .then(savedUser => res.json(savedUser))
        .catch(error => next(error))
})

module.exports = usersRouter
