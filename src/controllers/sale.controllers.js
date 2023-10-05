const { Sale } = require('../models/sale');
const { Product } = require('../models/product');
const { User } = require('../models/user');
const { Address } = require('../models/address');

class SaleController {
  async createSale(req, res) {
    try {
      const {
        buyerId,
        sellerId,
        productId,
        unitPrice,
        amountBuy,
        userAddressId,
        total,
        typePayment,
        email,
      } = req.body;

      if (
        !productId ||
        !unitPrice ||
        !amountBuy ||
        !userAddressId ||
        !total ||
        !typePayment
      ) {
        return res.status(422).json({
          error: "Preencha todos os campos obrigatórios!",
        });
      }

      if (!isValidTypeProduct(productId)) {
        return res.status(400).json({
          error:
            "O campo productId está mal formatado. Só é válido Medicamento controlado ou Medicamento não controlado",
        });
      }

      if (!isValidEmail(email)) {
        return res.status(400).json({
          error: "O campo email está em um formato inválido.",
        });
      }

      if (buyerId === undefined || req.user.typeUser !== "administrador") {
        return res.status(403).json({
          error:
            "Acesso negado. O campo buyerId é obrigatório para usuários com tipo 'administrador'.",
        });
      }

      // Criar a venda usando os dados recebidos
      const newSale = await Sale.create({
        buyerId,
        sellerId,
        productId,
        unitPrice,
        amountBuy,
        userAddressId,
        total,
        typePayment,
      });

      return res.status(201).json({
        message: "Registros criados com sucesso!",
        sale: newSale,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Não foi possível cadastrar uma venda!",
      });
    }
  }
}

function isValidTypeProduct(productId) {
  const validProducts = ["Medicamento controlado", "Medicamento não controlado"];
  return validProducts.includes(productId);
}

function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
}

module.exports = new SaleController();
