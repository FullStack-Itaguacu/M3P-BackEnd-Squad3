const { Router } = require("express");
const buyerController = require("../../controllers/buyer.controllers");
const authLoginMiddleware = require("../../middlewares/authLoginMiddleware");

const router = Router();

router.get(
  "/buyers/admin/:offset/:limit",
  authLoginMiddleware,
  buyerController.listBuyers
);
router.get(
  "/buyers/admin/:userId",
  authLoginMiddleware,
  buyerController.getBuyerById
);
router.patch(
  "/buyers/admin/:userId",
  authLoginMiddleware,
  buyerController.updateBuyer
);

module.exports = router;
