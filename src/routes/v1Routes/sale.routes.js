const {Router} = require("express")
const saleController = require("../../controllers/sale.controllers")
const acessControl = require("../../middlewares/accessControlMiddleware")
const typeUserEnum = require("../../constants/enums/typeUserEnum")
const  auth  = require('../../middlewares/auth')


    const saleRoutes = Router()

    saleRoutes.post('/sales', saleController.createSale)
    saleRoutes.get('/sales', auth, acessControl(typeUserEnum.BUYER), saleController.listSales)
    saleRoutes.get('/sales/admin', auth, acessControl(typeUserEnum.ADMIN), saleController.listSaleAdmin)


module.exports = saleRoutes