const { verify } = require("jsonwebtoken")
const config = require("../config/config.server") 
const { HTTP_STATUS } = require("../constants/httpStatus")
const ERROR_MESSAGES = require("../constants/errorMessages")


async function auth(request, response, next) {
  try {
    const { authorization } = request.headers
    request["payload"] = verify(authorization, config.jwtSecret)
    next()
  } catch (error) {
    return response.status(HTTP_STATUS.UNAUTHORIZED).send(ERROR_MESSAGES.UNAUTHORIZED)
  }
}

module.exports = { auth }