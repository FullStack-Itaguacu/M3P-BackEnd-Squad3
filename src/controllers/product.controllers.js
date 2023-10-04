const { Product } = require("../models/product");
const express = require("express");
const app = express();

class productController {
  async listProductId(req, res) {
    function authenticate(req, res, next) {
      if (!req.isAuthenticated()) {
        return res
          .status(401)
          .send("Não autorizado. Faça login para acessar esta rota.");
      }
      next();
    }
    const { id } = req.params;
    try {
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
module.exports = productController;
