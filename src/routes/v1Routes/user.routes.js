const {Router} = require("express")
const userController = require("../../controllers/user.controllers")

const router = Router()


router.post("/user/create", userController.createUser)


module.exports = router