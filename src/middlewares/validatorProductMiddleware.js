const ERROR_MESSAGES = require("../constants/errorMessages");
const { HTTP_STATUS } = require("../constants/httpStatus");
const productSchema = require("../constants/schemas/productSchema");
const { Product } = require("../models/product");
const { User } = require("../models/user");

async function validatorBodyProduct (req,res,next){
  const{ name,labName,imageLink, dosage,typeDosage, unitPrice, totalStock,typeProduct,description } = req.body
  const userId = req.user.id;

  const validatorBodySchema = productSchema.validate({ name,labName,imageLink, dosage,typeDosage, unitPrice, totalStock,typeProduct,description })

    if(validatorBodySchema.error){
        const errors = validatorBodySchema.error.details.map(({message})=>({
        message
        }))
        return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(
           {
            code: ERROR_MESSAGES.INVALID_DATA.code,
            message: ERROR_MESSAGES.INVALID_DATA.message,
            cause:errors[0].message,
           })
    }
    
    const existProductResgistered = await Product.findOne({
      where: {
        name,
        userId,
      },
    });
  
    if (existProductResgistered) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .send(ERROR_MESSAGES.PRODUCT_ALREADY_REGISTERED);
    }

   const existUser = await User.findByPk(userId)
    if(!existUser){
        return res.status(HTTP_STATUS.BAD_REQUEST).send(ERROR_MESSAGES.INVALID_USER)
    }

    next()
}

module.exports = validatorBodyProduct