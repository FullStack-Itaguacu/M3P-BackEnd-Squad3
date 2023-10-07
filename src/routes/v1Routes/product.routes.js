const { Router } = require("express");
const productController = require("../../controllers/product.controllers");

Router.get("/products/:id", authenticate(), productController.listProductId);
Router.get("/cadastro/", authenticate(), productController.createOneProduct);
