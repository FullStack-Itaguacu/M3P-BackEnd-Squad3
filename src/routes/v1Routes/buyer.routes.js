const { Router } = require("express");
const buyerController = require("../../controllers/buyer.controllers");
const authLoginMiddleware = require("../../middlewares/authLoginMiddleware");
const auth = require("../../middlewares/auth");

const router = Router();

router.get("/buyers/admin/:offset/:limit", auth, buyerController.listBuyers);
router.get("/buyers/admin/:userId", auth, buyerController.getBuyerById);
router.patch("/buyers/admin/:userId", auth, buyerController.updateBuyer);

module.exports = router;
