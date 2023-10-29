const { Sale } = require("../models/sale");

const { HTTP_STATUS } = require("../constants/httpStatus");
const ERROR_MESSAGES = require("../constants/errorMessages");
const { dbConnection } = require("../database/dbConnection");
const { SalesItem } = require("../models/sales_item");
const { Product } = require("../models/product");

class SaleController {
  createSale = async (req, res) => {
    const typePayment = req.typePayment;
    const body = req.body;
    const buyerId = req.user.id;
    const products = req.product;
    let total = 0;

    try {
      const sale = await Sale.create({
        buyerId,
        total,
        addressId: body[0].addressId,
        typePayment: typePayment,
      });

      for (const product of products) {
        const amount = body.find(
          (item) => item.productId === product.id
        ).amountBuy;

        const saleItem = await SalesItem.create({
          saleId: sale.id,
          sellerId: product.userId,
          productId: product.id,
          amountBuy: amount,
        });

        total += product.unitPrice * amount;
        

        await sale.update({ total });

        await product.update({ totalStock: product.totalStock - amount });
      }

      return res.status(HTTP_STATUS.CREATED).send(sale);
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

      if (typeof buyerId !== "undefined") {
        const sales = await Sale.findAll({ where: { buyerId } });

        if (sales) {
          res.status(HTTP_STATUS.OK).send(sales);
        }
      }
    } catch (error) {
      console.error(error);
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send(ERROR_MESSAGES.FAILED_TO_LIST);
    }
  };

  listSaleById = async (req, res) => {
    try {
      const saleId = req.params.id;
    

      if (typeof saleId !== "undefined") {
        const salesItems = await SalesItem.findAll({ where: { saleId } });

        if (salesItems) {
          return res.status(HTTP_STATUS.OK).send(salesItems);
        }
      }
    } catch (error) {
      // console.error(error);
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send(ERROR_MESSAGES.FAILED_TO_LIST);
    }
  };

  listSaleAdmin = async (req, res) => {
    try {
      const sellerId = req.user.id;

      if (typeof sellerId !== "undefined") {
        const sales = await SalesItem.findAll({ where: { sellerId } });

        if (sales) {
          return res.status(HTTP_STATUS.OK).send(sales);
        }
      }
    } catch (error) {
      console.error(error);
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send(ERROR_MESSAGES.FAILED_TO_LIST);
    }
  };
  dashboardAdmin = async (req, res) => {
    try {
      const sellerId = req.user.id;
      let totalSales = 0;
      let totalAmount = 0;

      if (typeof sellerId !== "undefined") {
        const sales = await SalesItem.findAll({ where: { sellerId } });
        if (sales) {
          await Promise.all(sales.map(async (sale) => {
            const productsale = await Product.findByPk(sale.productId);
            totalSales += sale.amountBuy * productsale.unitPrice;
            totalAmount += sale.amountBuy;
          }));
          return res.status(HTTP_STATUS.OK).send({ totalSales, totalAmount });
        }   
      }  else {
        return res.status(HTTP_STATUS.OK).send({ totalSales, totalAmount });
      }
      
    } catch (error) {
      console.error(error);
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send(ERROR_MESSAGES.FAILED_TO_LIST);
    }
  };
}

const saleController = new SaleController();
module.exports = saleController;
