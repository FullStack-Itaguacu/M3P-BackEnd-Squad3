const { Router } = require("express")
const userRoutes = require("./v1Routes/user.routes")
const saleRoutes = require("./v1Routes/sale.routes")
const productRoutes = require("./v1Routes/product.routes")

const routes = new Router()

routes.use("/api", [
    userRoutes,
    saleRoutes,
    productRoutes,
    
])

module.exports = routes