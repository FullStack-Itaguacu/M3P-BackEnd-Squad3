const { Sale } = require ('../models/sale')
const { Product } = require ('../models/product')
const { HTTP_STATUS } = require("../constants/httpStatus");
const  ERROR_MESSAGES  = require("../constants/errorMessages");
const { SUCESS_MESSAGE } = require("../constants/sucessMessage")

class SaleController {
  createSale = async (req, res) => {
    const createSales = [];
  
    try {
      for (const sale of req.body) {
        const product = req.product;
        const buyerId = req.user.id;
        const sellerId = product.userId;
  
        const updateAmountBuyProduct = product.totalStock - sale.amountBuy;
        await Product.update(
          { totalStock: updateAmountBuyProduct },
          { where: { id: sale.productId } }
        );
  
        const unitPrice = product.unitPrice;
        const total = unitPrice * sale.amountBuy;
  
        const newSale = await Sale.create({
          buyerId,
          sellerId,
          productId: sale.productId,
          amountBuy: sale.amountBuy,
          userAddressId: sale.userAddressId,
          total,
          typePayment: sale.typePayment,
        });
  
        createSales.push(newSale);
      }
  
      console.log(createSales);
      
      // Enviar a resposta após o loop ter processado todas as vendas
      return res.status(HTTP_STATUS.CREATED).json(createSales);
    } catch (error) {
      console.error(error);
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send(ERROR_MESSAGES.FAILED_TO_CREATE);
    }
  };

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

      listSaleAdmin = async (req, res) => {
        try {
            const sellerId = req.user.id;
            
            if (typeof sellerId!== 'undefined') { 
              const sales = await Sale.findAll({ where: { sellerId} });
              
              if(sales){
              return res.status(HTTP_STATUS.OK).send(sales)}
              
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