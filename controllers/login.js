const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res, next) => {
    const body = req.body
    const user = await User.findOne({username: body.username})
    const passWordCorrect = user === null ?
    false :
    await bcrypt.compare(body.password, user.passwordHash)

    if (!(user && passWordCorrect)) {
        return res.status(401).json({
            error: 'invalid username or password'
        })
    }
    const userForToken = {
        username: user.username,
        id: user._id,
    }
    const token = jwt.sign(
        userForToken,
        process.env.SECRET,
        {expiresIn: 60*60*24}
    )
    res.status(200).send({
        token,
    })
})

module.exports = loginRouter
