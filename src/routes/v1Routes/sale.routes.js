const {Router} = require("express")
const { createSale } = require("../../controllers/sale.controllers")


class SaleRouter {
    routesFromSale() {
        const saleRoutes = Router()
            saleRoutes.post('/sales/admin/', createSale)

            return saleRoutes
    }
}

module.exports = new SaleRouter()