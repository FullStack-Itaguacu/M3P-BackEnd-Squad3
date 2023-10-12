const { Router } = require("express");
const userRoutes = require("./v1Routes/user.routes");
const buyerRoutes = require("./v1Routes/buyer.routes");
const saleRoutes = require("./v1Routes/sale.routes");
const productRoutes = require("./v1Routes/product.routes");
const admintRoutes = require("./v1Routes/admin.routes");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec  = require("../swagger/SwaggerDocumentation.json");

const routes = new Router();

routes.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
routes.use("/api", [userRoutes, saleRoutes, productRoutes, buyerRoutes, admintRoutes]);

module.exports = routes;
