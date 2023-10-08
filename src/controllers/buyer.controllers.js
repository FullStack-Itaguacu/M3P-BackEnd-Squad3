const { User } = require("../models/user");
const Sequelize = require("sequelize");
const { typesUserEnum } = require("../constants/typeUserEnum");
const { HTTP_STATUS } = require("../constants/httpStatus");
const ERROR_MESSAGES = require("../constants/errorMessages");

class BuyerController {
  async listBuyers(req, res) {
    const { offset = 0, limit = 20 } = req.params;
    const { fullName, createdAt } = req.query;
    const user = req.payload;

    try {
      if (user.typeUser == typesUserEnum.BUYER) {
        return res
          .status(HTTP_STATUS.FORBIDDEN)
          .send({ message: ERROR_MESSAGES.FORBIDDEN });
      }
      const whereClause = typesUserEnum.BUYER;

      if (fullName) {
        whereClause.name = {
          [Sequelize.Op.iLike]: `%${fullName}%`,
        };
      }

      const order = [];
      if (createdAt === "asc") {
        order.push(["createdAt", "ASC"]);
      } else if (createdAt === "desc") {
        order.push(["createdAt", "DESC"]);
      }
      const { count, rows: users } = await User.findAndCountAll({
        where: whereClause,
        order,
        offset: Number(offset),
        limit: Number(limit),
      });

      if (count === 0) {
        return res.status(HTTP_STATUS.NO_CONTENT).send();
      }

      res.status(HTTP_STATUS.OK).send({
        total: count,
        users,
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
    const user = req.payload;

    try {
      if (user.typeUser == typesUserEnum.BUYER) {
        return res
          .status(HTTP_STATUS.FORBIDDEN)
          .send({ message: ERROR_MESSAGES.FORBIDDEN });
      }

      const foundUser = await User.findByPk(userId);

      if (!foundUser) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .send({ message: ERROR_MESSAGES.INVALID_USER });
      }

      const userResponse = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
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
    const user = req.payload;

    try {
      if (user.typeUser == typesUserEnum.BUYER) {
        return res
          .status(HTTP_STATUS.FORBIDDEN)
          .send({ message: ERROR_MESSAGES.FORBIDDEN });
      }

      const foundUser = await User.findByPk(userId);

      if (!foundUser) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .send({ message: ERROR_MESSAGES.INVALID_USER });
      }

      const { fullName, email, cpf, phone, typeUser } = req.body;

      if (fullName) {
        foundUser.name = fullName;
      }

      if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return res
            .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
            .send({ message: ERROR_MESSAGES.INVALID_EMAIL });
        }
        foundUser.email = email;
      }

      if (cpf) {
        const cpfRegex = /^\d{11}$/;
        if (!cpfRegex.test(cpf)) {
          return res
            .status(HTTP_STATUS.UNPROCESSABLE_ENTIT)
            .send({ message: ERROR_MESSAGES.INVALID_CPF });
        }

        foundUser.cpf = cpf.replace(/\D/g, "");
      }

      if (phone !== undefined) {
        const phoneRegex = /^\d{11,}$/;
        if (!phoneRegex.test(phone)) {
          return res
            .status(HTTP_STATUS.UNPROCESSABLE_ENTIT)
            .send({ message: ERROR_MESSAGES.INVALID_PHONE });
        }
        foundUser.phone = phone;
      }

      if (typeUser && typeUser !== foundUser.typeUser) {
        if (
          foundUser.typeUser === typesUserEnum.BUYER &&
          typeUser === typesUserEnum.ADMIN
        ) {
          return res.status(HTTP_STATUS.UNPROCESSABLE_ENTIT).send({
            message: ERROR_MESSAGES.TYPE_USER_REQUIRED,
          });
        }
        foundUser.typeUser = typeUser;
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
}

const buyerController = new BuyerController();

module.exports = buyerController;
