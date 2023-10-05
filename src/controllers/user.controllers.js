const { User } = require("../models/user");
const { Address } = require("../models/address");
const { UserAddress } = require("../models/user_address");
const { HTTP_STATUS } = require("../constants/httpStatus");
const ERROR_MESSAGES = require("../constants/errorMessages");
const passwordHasher = require("../utils/passwordHasher");
const validateUserInput = require("../services/validateUserInput.services");
const checkEmailOrCPFExists = require("../services/checkEmailOrCPFExists");
const { SUCESS_MESSAGE } = require("../constants/sucessMessage");
const passport = require("../utils/passportConfig");

class UserController {
  createUser = async (req, res) => {
    const { user, address } = req.body;
    const {
      zip,
      street,
      numberStreet,
      neighborhood,
      city,
      state,
      complement,
      lat,
      long,
    } = address;
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
      });

      const addressCreated = await Address.create(address);

      const userAddressCreated = await UserAddress.create({
        userId: userCreated.id,
        addressId: addressCreated.id,
      });

      return res.status(HTTP_STATUS.CREATED).send(SUCESS_MESSAGE.USER_CREATED);
    } catch (error) {
      console.log(error);
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  };

  loginUser = async (req, res) => {

    const { email, password } = req.body;
  
    passport.authenticate('local', { session: false }, (err, user, info) => {
  
      if (err) {
        return res.status(500).json({ error: 'Falha na autenticação' });
      }
  
      if (!user) {
        return res.status(401).json(info);
      }
  
  
      return res.json({user, token});
  
    })(req, res);
  
  };
}

const userController = new UserController();

module.exports = userController;
