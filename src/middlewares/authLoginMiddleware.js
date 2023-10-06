const ERROR_MESSAGES = require("../constants/errorMessages");
const { HTTP_STATUS } = require("../constants/httpStatus");
const authLoginService = require("../services/authLogin.services");

async function authLoginMiddleware(req, res, next) {
  try {
    const { email, password } = req.body;
    const patch = req.originalUrl;

    if (!email || !password) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .send(ERROR_MESSAGES.INVALID_DATA_LOGIN);
    }
    const user = await authLoginService.findUserByEmail(email);

    if (patch === "/api/admin/login") {
      if (user.typeUser !== "ADMIN") {
        return res
          .status(HTTP_STATUS. FORBIDDEN)
          .send(ERROR_MESSAGES.FORBIDDEN);
      }
    }

    if (!user) {
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .send(ERROR_MESSAGES.EMAIL_OR_PASSWORD_IS_INCORRECT);
    }

    const passwordMatch = await authLoginService.validatePassword(
      password,
      user
    );
    if (!passwordMatch) {
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .send(ERROR_MESSAGES.EMAIL_OR_PASSWORD_IS_INCORRECT);
    }

    req.user = user.dataValues;

    next();
  } catch (error) {
    return res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .send(ERROR_MESSAGES.UNAUTHORIZED);
  }
}

module.exports = authLoginMiddleware;
