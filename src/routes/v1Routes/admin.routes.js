const { Router } = require("express");
const adminController = require("../../controllers/admin.controllers");
const userSignupValidatorMiddleware = require("../../middlewares/userSignupValidatorMiddleware ");
const acessControl = require("../../middlewares/accessControlMiddleware");
const auth = require("../../middlewares/auth");
const typeUserEnum = require("../../constants/enums/typeUserEnum");
const authMiddleware = require("../../middlewares/authLoginMiddleware");

const router = Router();

router.post("/user/admin/signup",auth,acessControl(typeUserEnum.ADMIN),userSignupValidatorMiddleware,adminController.createUserAdmin);
router.post("/user/admin/login",authMiddleware,acessControl(typeUserEnum.ADMIN), adminController.loginUser);


module.exports = router;
