const { Router } = require("express");
const productController = require("../../controllers/product.controllers");

Router.get(
  "/api/products/:id",
  authenticate(),
  productController.listProductId
);
