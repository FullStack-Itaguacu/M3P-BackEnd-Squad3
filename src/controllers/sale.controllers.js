const { Sale } = require ('../models/sale')
const { Product } = require ('../models/product')
const { User } = require ('../models/user')
const { HTTP_STATUS } = require("../constants/httpStatus");
const  ERROR_MESSAGES  = require("../constants/errorMessages");
const { SUCESS_MESSAGE } = require("../constants/sucessMessage")

class SaleController {
  createSale = async (req, res) => {
    try {
      const {
        productId,
        unitPrice,
        amountBuy,
        userAddressId,
        typePayment,
        total,
        email,
      } = req.body;

      // Verificar se todos os campos obrigatórios estão preenchidos
      if (!productId || !unitPrice || !amountBuy || 
        !userAddressId || !typePayment || !total || !email ) {
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
      const name = await Product.findByPk(productId);
      console.log("Product:", name);
      // Verificar se o produto existe e a quantidade é suficiente
      if (!name || name.stock < amountBuy) {
        return res.status(HTTP_STATUS.CONFLICT).send(
          ERROR_MESSAGES.INSUFFICIENT_PRODUCT_QUANTITY
        );
      }

      // Obter o ID do vendedor a partir do produto
      const sellerId = name.userId;
      const buyerId = name.userId;
      console.log("Seller ID:", sellerId)
      

      const calculatedTotal = unitPrice * amountBuy;

      await Product.update(
        { quantity: name.quantity - amountBuy },
        { where: { id: productId } }
      );

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
        sellerId: sellerId,
        buyerId: buyerId,
        productId: productId,
        unitPrice: unitPrice,
        amountBuy: amountBuy,
        userAddressId: userAddressId,
        total: calculatedTotal,
        typePayment: typePayment,
      });

      // Atualizar a quantidade de produtos na tabela products
      await Product.update(
        { quantity: name.quantity - amountBuy },
        { where: { id: productId } }
      );

      return res.status(HTTP_STATUS.CREATED).send({
        message: SUCESS_MESSAGE.SALE_CREATED,
        sale: newSale,
      });
    } catch (error) {
      console.error(error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(
        ERROR_MESSAGES.FAILED_TO_CREATE
      );
    }
  }


  
  listSales = async (req, res) => {
    try {
        const buyerId = req.user.id;
        
        if (typeof buyerId!== 'undefined') { 
          const sales = await Sale.findAll({ where: { buyerId} });
          
          if(sales){
            res.status(HTTP_STATUS.OK).send(sales)
          }
          
        }
      }catch (error) {
          console.error(error);
          return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(
            ERROR_MESSAGES.FAILED_TO_LIST
          )}
      }
    }
  
  
  
  


  

const saleController = new SaleController();
module.exports = saleController;