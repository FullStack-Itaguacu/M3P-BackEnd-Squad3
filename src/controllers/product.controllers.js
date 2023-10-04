const { Product } = require("../models/product");
const express = require("express");
const app = express();

class ProductController {
  async listProductId(req, res) {
    const { id } = req.params;
    const user = req.user;
    try {
      if (!user || user.roles !== "Administrador") {
        return res
          .status(401)
          .send("Não autorizado. Faça login para continuar.");
      }
      const produto = await Product.findById(id);
      if (!produto) {
        return res.status(404).send("Produto não encontrado.");
      }
      return res.status(200).send({ produto });
    } catch (error) {
      return res.status(500).send("Erro interno do servidor.");
    }
  }
}

const productController = new ProductController();
module.exports = productController;
