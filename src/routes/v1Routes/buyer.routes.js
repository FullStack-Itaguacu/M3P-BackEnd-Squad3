const { Router } = require("express");
const buyerController = require("../../controllers/buyer.controllers");
const auth = require("../../middlewares/auth");
const acessControl = require("../../middlewares/accessControlMiddleware");
const typeUserEnum = require("../../constants/enums/typeUserEnum");

const router = Router();



router.get("/buyers/admin/:offset/:limit",auth,acessControl(typeUserEnum.ADMIN),buyerController.listBuyers);
router.get("/buyers/admin/:userId",auth,acessControl(typeUserEnum.ADMIN),buyerController.getBuyerById);
router.patch("/buyers/admin/:userId",auth,acessControl(typeUserEnum.ADMIN),buyerController.updateBuyer);
router.get("/buyers/address", auth, buyerController.listAddress );


module.exports = router;
