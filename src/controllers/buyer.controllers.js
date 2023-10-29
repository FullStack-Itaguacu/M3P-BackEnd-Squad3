const { User } = require("../models/user");
const { UserAddress } = require("../models/user_address");
const Sequelize = require("sequelize");
const typeUserEnum = require("../constants/enums/typeUserEnum");
const { HTTP_STATUS } = require("../constants/httpStatus");
const ERROR_MESSAGES = require("../constants/errorMessages");
const { Address } = require("../models/address");

class BuyerController {
  async listBuyers(req, res) {
    const { offset = 0, limit = 20 } = req.params;
    const { fullName, orderBy, orderDirection } = req.query;
    try {
      const whereClause = {};
      if (fullName) {
        whereClause.fullName = {
          [Sequelize.Op.iLike]: `%${fullName}%`,
        };
      }

      const order = [];
      if (orderBy) {
        if (orderDirection === "asc") {
          order.push([orderBy, "ASC"]);
        } else if (orderDirection === "desc") {
          order.push([orderBy, "DESC"]);
        }
      }
      const { count, rows: users } = await User.findAndCountAll({
        where: whereClause,
        order,
        offset: Number(offset),
        limit: Number(limit),
      });

      const totalPages = Math.ceil(count / limit);

      const userData = users.map((user) => {
        return {
          id: user.id,
          name: user.fullName,
          email: user.email,
          cpf: user.cpf,
          phone: user.phone,
          birthDate: user.birthDate,
          typeUser: user.typeUser,
          createdAt: user.createdAt,
        };
      });

      if (count === 0) {
        return res.status(HTTP_STATUS.NO_CONTENT).send();
      }

      res.status(HTTP_STATUS.OK).send({
        users: userData,
        totalPages,
        currentPage: offset / limit + 1,
      });
    } catch (error) {
      console.error(error);

      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.SERVER_ERROR });
    }
  }

  async getBuyerById(req, res) {
    const userId = req.params.userId;

    try {
      const foundUser = await User.findByPk(userId);

      if (!foundUser) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .send({ message: ERROR_MESSAGES.INVALID_USER });
      }

      const userResponse = {
        id: foundUser.id,
        name: foundUser.fullName,
        email: foundUser.email,
        cpf: foundUser.cpf,
        phone: foundUser.phone,
        typeUser: foundUser.typeUser,
        birthDate: foundUser.birthDate,
        createdAt: foundUser.createdAt,
        updatedAt: foundUser.updatedAt,
      };

      res.status(HTTP_STATUS.OK).send(userResponse);
    } catch (error) {
      console.error(error);
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.SERVER_ERROR });
    }
  }

  async updateBuyer(req, res) {
    const userId = req.params.userId;

    try {
      const foundUser = await User.findByPk(userId);

      if (!foundUser) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .send({ message: ERROR_MESSAGES.INVALID_USER });
      }

      const { fullName, email, cpf, phone, typeUser } = req.body;

      if (fullName !== undefined) {
        foundUser.fullName = fullName;
      }

      if (email !== undefined) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
          return res
            .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
            .send({ message: ERROR_MESSAGES.INVALID_EMAIL });
        }
        foundUser.email = email;
      }

      if (cpf !== undefined) {
        const cpfRegex = /^\d{11}$/;
        if (cpf && !cpfRegex.test(cpf)) {
          return res
            .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
            .send({ message: ERROR_MESSAGES.INVALID_CPF });
        }

        foundUser.cpf = cpf ? cpf.replace(/\D/g, "") : null;
      }

      if (phone !== undefined) {
        const phoneRegex = /^\d{11,}$/;
        if (phone && !phoneRegex.test(phone)) {
          return res
            .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
            .send({ message: ERROR_MESSAGES.INVALID_PHONE });
        }
        foundUser.phone = phone;
      }

      if (typeUser !== undefined) {
        if (
          typeUser.includes(typeUserEnum.BUYER) ||
          typeUser.includes(typeUserEnum.ADMIN)
        ) {
          foundUser.typeUser = typeUser;
        } else {
          return res
            .status(HTTP_STATUS.BAD_REQUEST)
            .send(ERROR_MESSAGES.INVALID_TYPE_USER);
        }
      }

      await foundUser.save();

      res.status(HTTP_STATUS.NO_CONTENT).send();
    } catch (error) {
      console.error(error);
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.SERVER_ERROR });
    }
  }

  listAddress = async (req, res) => {
    try {
      const addressId = req.user.id;

      if (typeof addressId !== "undefined") {
        const userAddress = await UserAddress.findOne({
          where: { userId: req.user.id },
        });

        const addresses = await Address.findAll({
          where: {
            userAddressId: userAddress.id,
          },
        });

        if (addresses) {
          res.status(HTTP_STATUS.OK).send(addresses);
        }
      }
    } catch (error) {
      console.error(error);
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send(ERROR_MESSAGES.SERVER_ERROR);
    }
  };
}

const buyerController = new BuyerController();

module.exports = buyerController;
