const { Router } = require("express");
const adminController = require("../../controllers/admin.controllers");
const userSignupValidatorMiddleware = require("../../middlewares/userSignupValidatorMiddleware ");
const authLoginMiddleware = require("../../middlewares/authLoginMiddleware");
const acessControl = require("../../middlewares/accessControlMiddleware");

const router = Router();

router.post(
  "/user/admin/signup",
  userSignupValidatorMiddleware,
  adminController.createUserAdmin
);
router.post("/user/admin/login", adminController.loginUser);

module.exports = router;
