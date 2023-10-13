const addressSchema = require("../constants/schemas/addressSchema");
const ERROR_MESSAGES = require("../constants/errorMessages");
const { HTTP_STATUS } = require("../constants/httpStatus");
const userSchema = require("../constants/schemas/userShema");
const typeUserEnum = require("../constants/enums/typeUserEnum");

async function userSignupValidatorMiddleware(req, res, next) {
  try {
    const { user, address } = req.body;

    const patch = req.originalUrl;

    if (patch === "/api/admin/signup") {
      const dataTypeUser = user.typeUser;

      if (dataTypeUser !== typeUserEnum.ADMIN) {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .send(ERROR_MESSAGES.TYPE_USER_REQUIRED);
      }
    }

    const userValidate = await userSchema.validate(user);
    const addressValidate = await addressSchema.validate(address);

    if (userValidate.error) {
      const errors = userValidate.error.details.map(({ message }) => ({
        message,
      }));

      return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send({
        code: ERROR_MESSAGES.INVALID_DATA.code,
        message: ERROR_MESSAGES.INVALID_DATA.message,
        cause:errors[0].message,
      });
    }
    if (addressValidate.error) {
      const errors = addressValidate.error.details.map(({ message }) => ({
        message,
      }));

      return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send({
        code: ERROR_MESSAGES.INVALID_DATA.code,
        message: ERROR_MESSAGES.INVALID_DATA.message,
        cause:errors[0].message,
      });
    }

    next();
  } catch (error) {
    console.log(error);
  }
}

module.exports = userSignupValidatorMiddleware;
