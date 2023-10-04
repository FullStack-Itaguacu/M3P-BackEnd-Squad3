const { Product } = require("../models/product");

class ProductController {
  async listProductId(req, res) {
    const { id } = request.params;
    const data = await Product.findById(id);
    if (!data) {
      return response.status(404).send("Produto não encontrado.");
    }
    return response.status(200).send({ data });
  }
}

const productController = new ProductController();

module.exports = productController;
