const { Op } = require("sequelize");
const { Product } = require("../models/product");

const DEFAULT_LIMIT = 20;

class ProductService {
  constructor(productModel) {
    this.product = productModel;
  }

  async getFilteredProducts(where) {
    const products = await this.product.findAll({ where });
    return products;
  }

  async getPaginatedProducts(options) {
    const { where, order, offset, limit } = options;
    console.log("where", options);

    const { count, rows } = await this.product.findAndCountAll({
      where,
      order,
      offset,
      limit,
    });
    return {
      products: rows,
      total: count,
    };
  }

  buildQueryOptions(req) {
    const userId = req.user.id;
    const { name, type } = req.query;
    const { offset, limit } = req.params;

    const options = {
      isPaginated: !!limit,
      where: { userId },
      order: [],
      offset: parseInt(offset) || 0,
      limit: parseInt(limit) || DEFAULT_LIMIT,
    };

    if (name) {
      options.where.name = { [Op.iLike]: `%${name}%` };
    }

    if (type) {
      options.where.type = type;
    }

    return options;
  }
}

const productService = new ProductService(Product);

module.exports = productService;
