const { User } = require("../models/user");
const Sequelize = require("sequelize");

class BuyerController {
  async listBuyers(req, res) {
    const { offset = 0, limit = 20 } = req.params;
    const { fullName, createdAt } = req.query;
    const user = req.payload;

    try {
      if (user.typeUser == "BUYER") {
        return res
          .status(403)
          .send({ message: "Acesso negado para este tipo de usuário" });
      }
      const whereClause = {
        typeUser: "BUYER",
      };

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
        return res.status(204).send({ message: "Nenhum usuário encontrado!" });
      }

      res.status(200).json({
        total: count,
        users,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Erro interno do servidor" });
    }
  }

  async getBuyerById(req, res) {
    const userId = req.params.userId;
    const user = req.payload;

    try {
      if (user.typeUser == "BUYER") {
        return res
          .status(403)
          .send({ message: "Acesso negado para este tipo de usuário" });
      }

      const foundUser = await User.findByPk(userId);

      if (!foundUser) {
        return res.status(404).send({ message: "Usuário não encontrado!" });
      }

      const userResponse = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        createdAt: foundUser.createdAt,
        updatedAt: foundUser.updatedAt,
      };

      res.status(200).send(userResponse);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Erro interno do servidor" });
    }
  }

  async updateBuyer(req, res) {
    const userId = req.params.userId;
    const user = req.payload;

    try {
      if (user.typeUser == "BUYER") {
        return res
          .status(403)
          .send({ message: "Acesso negado para este tipo de usuário" });
      }

      const foundUser = await User.findByPk(userId);

      if (!foundUser) {
        return res.status(404).send({ message: "Usuário não encontrado!" });
      }

      const { fullName, email, cpf, phone, typeUser } = req.body;

      if (fullName) {
        foundUser.name = fullName;
      }

      if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return res
            .status(422)
            .send({ message: "O email fornecido não é válido" });
        }
        foundUser.email = email;
      }

      if (cpf) {
        const cpfRegex = /^\d{11}$/;
        if (!cpfRegex.test(cpf)) {
          return res
            .status(422)
            .send({ message: "O CPF fornecido não é válido" });
        }

        foundUser.cpf = cpf.replace(/\D/g, "");
      }

      if (phone !== undefined) {
        const phoneRegex = /^\d{11,}$/;
        if (!phoneRegex.test(phone)) {
          return res
            .status(422)
            .send({ message: "O número de telefone fornecido não é válido" });
        }
        foundUser.phone = phone;
      }

      if (typeUser && typeUser !== foundUser.typeUser) {
        if (foundUser.typeUser === "BUYER" && typeUser === "ADMIN") {
          return res.status(422).send({
            message:
              "Não é permitida a troca de tipo de usuário de BUYER para ADMIN",
          });
        }
        foundUser.typeUser = typeUser;
      }

      await foundUser.save();

      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Erro interno do servidor" });
    }
  }
}

const buyerController = new BuyerController();

module.exports = buyerController;
