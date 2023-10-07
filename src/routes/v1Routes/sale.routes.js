const {Router} = require("express")
const { createSale, listSales} = require("../../controllers/sale.controllers")
const { auth } = require('../../middlewares/auth')

class SaleRouter {
    routesFromSale() {
        const saleRoutes = Router()
            saleRoutes.post('/sales', createSale)
            saleRoutes.get('/sale', auth, listSales)

            return saleRoutes
    }
}

module.exports = new SaleRouter()