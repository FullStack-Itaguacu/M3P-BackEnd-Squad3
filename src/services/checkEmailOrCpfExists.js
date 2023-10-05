const ERROR_MESSAGES = require("../constants/errorMessages");
const { User } = require("../models/user");

async function checkEmailOrCPFExists(email, cpf) {
    const searchResult = {};
 
    if(email){
        searchResult.email = await User.findOne({ where: { email } });
    }
    if(cpf){
        searchResult.cpf = await User.findOne({ where: { cpf } });
    }

    const dataOrRegistered = {};
    if(searchResult.email){
        dataOrRegistered.email = ERROR_MESSAGES.EMAIL_ALREADY_EXISTS;
        
    }
    if(searchResult.cpf){
        dataOrRegistered.cpf = ERROR_MESSAGES.CPF_ALREADY_EXISTS;
    }

    if(Object.keys(dataOrRegistered).length > 0){
        return {
            isValid: false,
            data: dataOrRegistered,
        };
    }

    return {
        isValid: true,
        data: {
            email,
            cpf,
        },
    };

 
}

module.exports = checkEmailOrCPFExists