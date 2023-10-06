const { Sale } = require ('../models/sale')
const { Product } = require ('../models/product')
const { HTTP_STATUS } = require("../constants/httpStatus");
const  ERROR_MESSAGES  = require("../constants/errorMessages");
const { SUCESS_MESSAGE } = require("../constants/sucessMessage")

class SaleController {
  async createSale(req, res) {
    try {
      const {
        productId,
        unitPrince,
        amountBuy,
        userAddressId,
        typePayment,
        email,
      } = req.body;

      // Verificar se todos os campos obrigatórios estão preenchidos
      if (!productId || !unitPrince || !amountBuy || 
        !userAddressId || !typePayment) {
        return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(
          ERROR_MESSAGES.MISSING_REQUIRED_FIELDS
        );
      }

      // Verificar se o tipo de pagamento está correto (conforme o ENUM)
      const validTypePayments = ["money",
      "credit card",
      "debit card",
      "pix",
      "bank slip",
      "bank transfer"]; 
      if (!validTypePayments.includes(typePayment)) {
        return res.status(HTTP_STATUS.BAD_REQUEST).send(
          ERROR_MESSAGES.INVALID_PAYMENT_TYPE
        );
      }

      // Verificar se o produto existe e a quantidade é suficiente
      const product = await Product.findByPk(productId);
      if (!product || product.quantity < amountBuy) {
        return res.status(HTTP_STATUS.CONFLICT).send(
          ERROR_MESSAGES.INSUFFICIENT_PRODUCT_QUANTITY
        );
      }

      // Obter o ID do vendedor a partir do produto
      const sellerId = product.userId; 

      // Calcular o total
      const unitPrice = product.price;
      const total = unitPrice * amountBuy;

      // Obter o comprador a partir do token JWT (payload)
      const buyerId = req.payload.id;

      //Verifica se o id do sallerId existe
        const isSellerIdValid = async (sellerId) => {
        const seller = await User.findByPk(sellerId);
        return seller !== null}
        
        //verifica se userAddress existe
        const isUserAddressValid = async (userAddressId) => {
          const userAddress = await userAddress.findByPk(userAddressId);
          return userAddress !== null;
        };

        //Verifica se  buyerId existe
        const isBuyerIdValid = async (buyerId) => {
          const buyer = await User.findByPk(buyerId);
          return buyer !== null;
        };

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

      return res.status(HTTP_STATUS.CREATED).send(
        SUCESS_MESSAGE.SALE_CREATED,
        {sale: newSale},
      );
    } catch (error) {
      console.error(error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(
        ERROR_MESSAGES.FAILED_TO_CREATE
      );
    }
  }
}

module.exports = new SaleController();