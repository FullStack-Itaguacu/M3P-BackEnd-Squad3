const { User } = require("../models/user");
const { Address } = require("../models/address");
const { UserAddress } = require("../models/user_address");
const { HTTP_STATUS } = require("../constants/httpStatus");
const ERROR_MESSAGES = require("../constants/errorMessages");
const passwordHasher = require("../utils/passwordHasher");
const validateUserInput = require("../services/validateUserInput.services");
const checkEmailOrCPFExists = require("../services/checkEmailOrCpfExists");
const { SUCESS_MESSAGE } = require("../constants/sucessMessage");
const { createJwtToken } = require("../utils/createJwtToken");

class AdminController {
  createUserAdmin = async (req, res) => {
    const { user, addresses } = req.body;
    const adminUserId = req.user.id;

    const { fullName, email, cpf, phone, password, birthDate, typeUser } = user;

    const passwordHash = await passwordHasher.hashPassword(password);

    const dataVarify = await validateUserInput({ cpf, email, phone });

    try {
      if (!dataVarify.isValid) {
        return res.status(HTTP_STATUS.BAD_REQUEST).send(dataVarify.errors);
      }
      const checkEmailCpf = await checkEmailOrCPFExists(email, cpf);
      if (!checkEmailCpf.isValid) {
        return res.status(HTTP_STATUS.CONFLICT).send(checkEmailCpf.data);
      }

      const userCreated = await User.create({
        fullName,
        email,
        cpf: dataVarify.data.cpf,
        phone,
        password: passwordHash,
        birthDate,
        typeUser,
        createdBy: adminUserId,
      });

      const userAddressCreated = await UserAddress.create({
        userId: userCreated.id,
      });

      for (const address of addresses) {
        const {
          street,
          numberStreet,
          neighborhood,
          complement,
          zip,
          city,
          state,
        } = address;

        const addressCreated = await Address.create({
          userAddressId: userAddressCreated.id,
          street,
          numberStreet,
          neighborhood,
          complement,
          zip,
          city,
          state,
        });

        await userAddressCreated.addAddress(addressCreated);
      }

      return res.status(HTTP_STATUS.CREATED).send(SUCESS_MESSAGE.USER_CREATED);
    } catch (error) {
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  };

  loginUser = async (req, res) => {
    const userDb = req.user;
  

    try {
      createJwtToken(userDb).then((token) => {
        return res.status(HTTP_STATUS.OK).send({ token });
      });
    } catch (error) {
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  };
}

const adminController = new AdminController();

module.exports = adminController;
