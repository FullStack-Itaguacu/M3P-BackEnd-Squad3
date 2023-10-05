const { Sale } = require ('../models/sale')
const { Product } = require ('../models/product')


class SaleController {
  async createSale(req, res) {
    try {
      const {
        productId,
        amountBuy,
        userAddressId,
        typePayment,
      } = req.body;

      // Verificar se todos os campos obrigatórios estão preenchidos
      if (!productId || !amountBuy || !userAddressId || !typePayment) {
        return res.status(422).json({
          error: "Preencha todos os campos obrigatórios!",
        });
      }

      // Verificar se o tipo de pagamento está correto (conforme o ENUM)
      const validTypePayments = ["money",
      "credit card",
      "debit card",
      "pix",
      "bank slip",
      "bank transfer"]; 
      if (!validTypePayments.includes(typePayment)) {
        return res.status(400).json({
          error: "O campo type_payment está em um formato inválido.",
        });
      }

        const buyerId = req.peyload ; 
     

      // Verificar se o produto existe e a quantidade é suficiente
      const product = await Product.findByPk(productId);
      if (!product || product.quantity < amountBuy) {
        return res.status(409).json({
          error: "Quantidade de produtos insuficiente ou produto não encontrado.",
        });
      }

      // Obter o ID do vendedor a partir do produto
      const sellerId = product.userId; 

      // Calcular o total
      const unitPrice = product.price;
      const total = unitPrice * amountBuy;

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

      // Atualizar a quantidade de produtos na tabela products
      await Product.update(
        { quantity: product.quantity - amountBuy },
        { where: { id: productId } }
      );

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

module.exports = new SaleController();