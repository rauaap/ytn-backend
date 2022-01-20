const logger = require('./logger')
const morgan = require('morgan')

morgan.token('jsonPost', (req, res) => {
        return req.method === 'POST' ?
        JSON.stringify(req.body) :
        null
    })
const requestLogger = morgan(':date - :method :url :status :res[content-length] - :response-time ms :jsonPost')

const unknownEndpoint = (request, response) => {
    response.status(404).send({
        error: 'unknown endpoint'
    })
}

const internalServerError = (error, request, response, next) => {
    response.status(500).send({
        error: 'internal server error'
    })
}

const validationErrorHandler = (error, request, response, next) => {
    const errors = error.errors
    if (errors.username) {
        return usernameErrors(error, request, response, next)
    }
    next(error)
}

const usernameErrors = (error, request, response, next) => {
    const kind = error.errors.username.kind
    if (kind === 'unique') {
        return response.status(400).send({
            error: 'this username has been taken'
        })
    }
    if (kind === 'required') {
        return response.status(400).send({
            error: 'username is required'
        })
    }
    else {
        return response.status(400).send({
            error: error.message
        })
    }
}

const errorHandler = (error, request, response, next) => {
    logger.error(error)
    if (error.name == 'CastError') {
        return response.status(400).send({
            error: 'malformatted id'
        })
    }
    else if (error.name == 'ValidationError') {
        return validationErrorHandler(error, request, response, next)
    }
    else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({
            error: 'token expired'
        })
    }
    next(error)
}

module.exports = {
    requestLogger,
    errorHandler,
    unknownEndpoint,
    internalServerError
}
