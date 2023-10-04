const { Router } = require("express")
const { routesFromSale } = require("./v1Routes/sale.routes")


const routes =  new Router()

routes.use('/api', [
    routesFromSale ()
    
])

module.exports = routes