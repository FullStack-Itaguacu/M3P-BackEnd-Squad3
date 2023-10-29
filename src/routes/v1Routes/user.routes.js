const {Router} = require("express")
const userController = require("../../controllers/user.controllers")
const userSignupValidatorMiddleware = require("../../middlewares/userSignupValidatorMiddleware ")
const authLoginMiddleware = require("../../middlewares/authLoginMiddleware")








const router = Router()


router.post("/user/signup",userSignupValidatorMiddleware, userController.createUser)
router.post("/user/login",authLoginMiddleware, userController.loginUser)




module.exports = router

