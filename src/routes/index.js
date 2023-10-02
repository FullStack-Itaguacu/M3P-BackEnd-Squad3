const { Router } = require("express")
const userRoutes = require("./v1Routes/user.routes")

const routes = new Router()



routes.use("/api", [
    userRoutes,
    
])

module.exports = routes