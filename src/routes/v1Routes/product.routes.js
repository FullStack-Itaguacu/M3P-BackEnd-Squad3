const { Router } = require("express");
const productController = require("../../controllers/product.controllers");
const acessControl = require("../../middlewares/accessControlMiddleware");
const typeUserEnum = require("../../constants/enums/typeUserEnum");
const auth = require("../../middlewares/auth");
const checkProductOwner = require("../../middlewares/checkProductOwnerMiddleware");
const router = Router();

router.get("/products/admin", auth,acessControl(typeUserEnum.ADMIN), productController.getProducts);
router.get("/products/:id", productController.listProductId);
router.get('/products/:offset/:limit', productController.getProducts);
router.patch("/products/admin/:productId", auth,acessControl(typeUserEnum.ADMIN),checkProductOwner, productController.updateProduct);



module.exports = router;