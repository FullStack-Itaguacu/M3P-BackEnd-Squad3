const ERROR_MESSAGES = require("../constants/errorMessages");
const { HTTP_STATUS } = require("../constants/httpStatus");
const { Product } = require("../models/product");

async function checkProductOwner(req, res, next) {
  const properties = ["name", "imageLink", "dosage", "totalStock"];
  const productOwnerId = req.user.id;
  const productId = req.params.productId;
 const {name, imageLink, dosage, totalStock} = req.body


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

    if(existingProperties.includes("name") ){
      if (!name || name.trim().length === 0) {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .send(ERROR_MESSAGES.INVALID_NAME);
      }
    }

    if(existingProperties.includes("imageLink") ){

      if (!imageLink &&  imageLink.trim() === 0) {

        
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .send(ERROR_MESSAGES.INVALID_IMAGE_LINK);
      }
    }

    if(existingProperties.includes("dosage") ){
        
      if (!dosage && dosage > 0 && dosage !== null) {
          return res
            .status(HTTP_STATUS.BAD_REQUEST)
            .send(ERROR_MESSAGES.INVALID_DOSAGE);
        }
      }

      if(existingProperties.includes("totalStock") ){
          
          if (!totalStock || typeof totalStock !== "number" ||totalStock < 0	) {
            return res
              .status(HTTP_STATUS.BAD_REQUEST)
              .send(ERROR_MESSAGES.INVALID_TOTAL_STOCK);
          }
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
