const {Router} = require("express")
const saleController = require("../../controllers/sale.controllers")
const acessControl = require("../../middlewares/accessControlMiddleware")
const typeUserEnum = require("../../constants/enums/typeUserEnum")
const validatorSales = require("../../middlewares/validatorSalesMiddleware")
const  auth  = require('../../middlewares/auth')



    const saleRoutes = Router()

    saleRoutes.post('/sales', auth, validatorSales, saleController.createSale)
    saleRoutes.get('/sales', auth, saleController.listSales)
    saleRoutes.get('/sales/admin', auth, acessControl(typeUserEnum.ADMIN), saleController.listSaleAdmin)
    saleRoutes.get('/sales/:id', auth, saleController.listSaleById)
    saleRoutes.get('/sales/dashboard/admin', auth, acessControl(typeUserEnum.ADMIN), saleController.dashboardAdmin)


module.exports = saleRoutes