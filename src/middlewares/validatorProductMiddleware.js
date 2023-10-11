const ERROR_MESSAGES = require("../constants/errorMessages");
const { HTTP_STATUS } = require("../constants/httpStatus");
const productSchema = require("../constants/schemas/productSchema");
const { User } = require("../models/user");

async function validatorBodyProduct (req,res,next){
  const{ name,labName,imageLink, dosage,typeDosage, unitPrice, totalStock,typeProduct,description } = req.body
  const userId = req.user.id;

  const validatorBodySchema = productSchema.validate({ name,labName,imageLink, dosage,typeDosage, unitPrice, totalStock,typeProduct,description })

    if(validatorBodySchema.error){
        const errors = validatorBodySchema.error.details.map(({message})=>({
        message
        }))
        return res.status(HTTP_STATUS.BAD_REQUEST).send(ERROR_MESSAGES.INVALID_DATA_BODY)
    }
   const existUser = await User.findByPk(userId)
    if(!existUser){
        return res.status(HTTP_STATUS.BAD_REQUEST).send(ERROR_MESSAGES.INVALID_USER)
    }

    next()
}

module.exports = validatorBodyProduct