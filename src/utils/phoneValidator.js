const phoneValidator = (phone) => {
    const phoneRegex = /^(?:(?:\+|00)\d{1,3}\s?)?(?:\(\d{2}\)\s?)?(?!([0-9])\1{7,})(\d{4,5}-\d{4}|\d{11})$/

    ;
    return phoneRegex.test(phone);
    }

module.exports = {
    phoneValidator,
};