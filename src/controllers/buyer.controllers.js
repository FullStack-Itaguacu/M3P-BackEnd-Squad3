const { User } = require("../models/user");

class BuyerController {
  async searchBuyer(req, res) {
    const { offset, limit } = req.params;
    const { fullName, createdAt } = req.query;

    try {
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
        return res.status(204).json({ message: "Nenhum comprador encontrado" });
      }

      res.status(200).json({
        total: count,
        buyers,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}

const buyerController = new BuyerController();

module.exports = buyerController;
