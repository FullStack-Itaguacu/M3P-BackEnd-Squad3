const { Router } = require("express");
const productController = require("../../controllers/product.controllers");
const acessControl = require("../../middlewares/accessControlMiddleware");
const typeUserEnum = require("../../constants/enums/typeUserEnum");
const auth = require("../../middlewares/auth");
const checkProductOwner = require("../../middlewares/checkProductOwnerMiddleware");
const validatorBodyProduct = require("../../middlewares/validatorProductMiddleware");
const router = Router();

router.get("/products/admin/:offset/:limit",auth,acessControl(typeUserEnum.ADMIN),productController.getProducts);
router.get("/products/:id", auth, productController.listProductId);
router.get("/products/:offset/:limit", productController.getProducts);
router.patch("/products/admin/:productId",auth,acessControl(typeUserEnum.ADMIN),checkProductOwner,productController.updateProduct);
router.post("/products/admin",auth,acessControl(typeUserEnum.ADMIN),validatorBodyProduct,productController.createProduct);

module.exports = router;
