const productSchema = require("../constants/schemas/productSchema")

async function validatorBodyProduct (req,res,next){
  const{ name,labName,imageLink, dosage,typeDosage, unitPrice, totalStock,typeProduct,description } = req.body

  const validatorBodySchema = productSchema.validate({ name,labName,imageLink, dosage,typeDosage, unitPrice, totalStock,typeProduct,description })

    if(validatorBodySchema.error){
        const errors = validatorBodySchema.error.details.map(({message})=>({
        message
        }))
        return res.status(400).send({errors})
    }

    next()
}

module.exports = validatorBodyProduct