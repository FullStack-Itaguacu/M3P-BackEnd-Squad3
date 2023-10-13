const { HTTP_STATUS } = require("../constants/httpStatus");
const ERROR_MESSAGES = require("../constants/errorMessages");
const typePaymentEnum = require("../constants/enums/typePaymentEnum");
const { Product } = require("../models/product");
const { UserAddress } = require("../models/user_address");
const { Address } = require("../models/address");

async function validatorSales(req, res, next) {
  const validatedProducts = [];
  const validateBody = [];
  let primaryTypePayment = "";

  try {
    if (!req.body || !Array.isArray(req.body)) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .send(ERROR_MESSAGES.INVALID_DATA);
    }
    for (const sale of req.body) {
      if (
        !sale.productId ||
        !sale.amountBuy ||
        !sale.addressId ||
        !sale.typePayment
      ) {
        return res
          .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
          .send(ERROR_MESSAGES.MISSING_REQUIRED_FIELDS);
      }

      const checkProduct = await Product.findByPk(sale.productId);
      if (!checkProduct) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .send(ERROR_MESSAGES.PRODUCT_NOT_FOUND);
      }

      const checkUserAddressId = await Address.findByPk(sale.addressId);
      if (!checkUserAddressId) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .send(ERROR_MESSAGES.INVALID_USER_ADDRESS_ID);
      }

      if (!checkProduct.totalStock > sale.amountBuy) {
        return res
          .status(HTTP_STATUS.CONFLICT)
          .send(ERROR_MESSAGES.INSUFFICIENT_PRODUCT_QUANTITY);
      }

      if (!typePaymentEnum.includes(sale.typePayment)) {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .send(ERROR_MESSAGES.INVALID_PAYMENT_TYPE);
      }

      primaryTypePayment = req.body[0].typePayment;
      
      const allTypePayments = req.body.every(
        (item) => item.typePayment === primaryTypePayment
      );

      if (!allTypePayments) {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .send(ERROR_MESSAGES.UNIC_TYPE_PAYMENT);
      }

      validatedProducts.push(checkProduct);
      validateBody.push(sale);
    }

    
    req.product = validatedProducts;
    req.typePayment = primaryTypePayment;
   

    next();
  } catch (error) {
    console.error(error);
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .send(ERROR_MESSAGES.SERVER_ERROR);
  }
}
module.exports = validatorSales;
