

const { Router } = require("express");
const userRoutes = require("./v1Routes/user.routes");
const buyerRoutes = require("./v1Routes/buyer.routes");
const saleRoutes = require("./v1Routes/sale.routes")
const productRoutes = require("./v1Routes/product.routes")

const routes = new Router();

routes.use("/api", [
    userRoutes,
    saleRoutes,
    productRoutes,
    buyerRoutes,
    
])

module.exports = routes;

