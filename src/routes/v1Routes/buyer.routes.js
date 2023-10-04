const { Router } = require("express");
const buyerController = require("../../controllers/buyer.controllers");

const router = Router();

router.get("/buyers/admin/:offset/:limit", buyerController.listBuyer);

module.exports = router;
