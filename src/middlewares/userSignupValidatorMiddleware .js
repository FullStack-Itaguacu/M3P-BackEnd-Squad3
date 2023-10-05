const addressSchema = require('../constants/addressSchema');
const { HTTP_STATUS } = require('../constants/httpStatus');
const userSchema  = require('../constants/userShema'); 

async function userSignupValidatorMiddleware (req, res, next) {


try {

    const {user,address} = req.body;
    
    const userValidate = await userSchema.validate(user);
    const addressValidate = await addressSchema.validate(address);
    
    if(userValidate.error){
          
        const errors = userValidate.error.details.map(({message}) => ({
            message  
          }));
          
          return res.status(400).send({errors});
            
    }
    if(addressValidate.error){
          
        const errors = addressValidate.error.details.map(({message}) => ({
            message  
          }));
          
          return res.status(400).send({errors});
            
    }

    
    next();


    
} catch (error){
    console.log(error);

} 
    
 

}

module.exports = userSignupValidatorMiddleware ;