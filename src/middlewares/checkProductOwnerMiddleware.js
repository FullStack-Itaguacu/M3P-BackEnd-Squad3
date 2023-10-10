const ERROR_MESSAGES = require("../constants/errorMessages");
const { HTTP_STATUS } = require("../constants/httpStatus");
const { Product } = require("../models/product");

async function checkProductOwner(req, res, next) {
  const properties = ["name", "imageLink", "dosage", "totalStock"];
  const productOwnerId = req.user.id;
  const productId = req.params.productId;

  try {
    const bodyProperties = Object.keys(req.body);
    const existingProperties = properties.filter((prop) =>
      bodyProperties.includes(prop)
    );

    if (!existingProperties || !existingProperties.length) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(ERROR_MESSAGES.INVALID_DATA);
    }

    const product = await Product.findByPk(productId);

    if (!product) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(ERROR_MESSAGES.PRODUCT_NOT_FOUND);
    }

    if (product.userId !== productOwnerId) {
      return res.status(HTTP_STATUS.FORBIDDEN).json(ERROR_MESSAGES.FORBIDDEN);
    }
    req.product = product;
  } catch (error) {
    console.error(error);
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json(ERROR_MESSAGES.SERVER_ERROR);
  }

  next();
}

module.exports = checkProductOwner;
