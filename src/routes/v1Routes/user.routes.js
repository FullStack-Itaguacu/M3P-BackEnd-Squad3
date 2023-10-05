const {Router} = require("express")
const userController = require("../../controllers/user.controllers")
const userSignupValidatorMiddleware = require("../../middlewares/userSignupValidatorMiddleware ")



const router = Router()


router.post("/user/signup",userSignupValidatorMiddleware, userController.createUser)
router.post("/user/login", userController.loginUser)


module.exports = router