const {Router} = require("express")
const saleController = require("../../controllers/sale.controllers")
//const  auth  = require('../../middlewares/auth')

    const saleRoutes = Router()

            saleRoutes.post('/sales', saleController.createSale)
            saleRoutes.get('/sales', saleController.listSales)


module.exports = saleRoutes