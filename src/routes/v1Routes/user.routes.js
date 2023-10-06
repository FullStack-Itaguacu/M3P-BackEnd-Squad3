const {Router} = require("express")
const userController = require("../../controllers/user.controllers")
const userSignupValidatorMiddleware = require("../../middlewares/userSignupValidatorMiddleware ")
const authLoginMiddleware = require("../../middlewares/authLoginMiddleware")
const auth = require("../../middlewares/auth")




const router = Router()


router.post("/user/signup",userSignupValidatorMiddleware, userController.createUser)
router.post("/user/login",authLoginMiddleware, userController.loginUser)
router.post("/admin/login",auth,authLoginMiddleware, userController.loginUser)


module.exports = router