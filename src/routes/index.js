const { Router } = require("express");
const userRoutes = require("./v1Routes/user.routes");
const buyerRoutes = require("./v1Routes/buyer.routes");

const routes = new Router();

routes.use("/api", [userRoutes, buyerRoutes]);

module.exports = routes;
