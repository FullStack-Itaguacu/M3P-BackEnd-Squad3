const {Router} = require("express")
const userController = require("../../controllers/user.controllers")
const userSignupValidatorMiddleware = require("../../middlewares/userSignupValidatorMiddleware ")
const authLoginMiddleware = require("../../middlewares/authLoginMiddleware")
const acessControl = require("../../middlewares/accessControlMiddleware")
const typeUserEnum = require("../../constants/enums/typeUserEnum")







const router = Router()


router.post("/user/signup",userSignupValidatorMiddleware, userController.createUser)
router.post("/user/login",authLoginMiddleware, userController.loginUser)
router.post("/admin/login",authLoginMiddleware,acessControl(typeUserEnum.ADMIN), userController.loginUser)



module.exports = router