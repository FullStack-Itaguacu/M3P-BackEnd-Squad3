const { User } = require("../models/user");
const Sequelize = require("sequelize");

class BuyerController {
  async listBuyer(req, res) {
    const { offset, limit } = buyersData.params;
    const { fullName, createdAt } = buyersData.query;
    const user = data; // lembrar de modificar para receber os dados do db

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
          [Sequelize.Op.iLike]: `%${fullName}%`, // Filtrar por nome (case-insensitive)
        };
      }

      const order = [];
      if (createdAt === "asc") {
        order.push(["createdAt", "ASC"]);
      } else if (createdAt === "desc") {
        order.push(["createdAt", "DESC"]);
      }
      const { count, rows: buyers } = await User.findAndCountAll({
        where: whereClause,
        order,
        offset: Number(offset),
        limit: Number(limit),
      });

      if (count === 0) {
        return res
          .status(204)
          .send({ message: "Nenhum comprador encontrado!" });
      }

      res.status(200).json({
        total: count,
        buyers,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Erro interno do servidor" });
    }
  }
}

const buyerController = new BuyerController();

module.exports = buyerController;
