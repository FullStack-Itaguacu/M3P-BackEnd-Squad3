const { Op } = require("sequelize");
const { Product } = require("../models/product");
const { DEFAULT_LIMIT, DEFAULT_OFFSET } = require("../constants/defaultsValue");
const typeProductEnum = require("../constants/enums/typeProductEnum");
const ERROR_MESSAGES = require("../constants/errorMessages");
const typeUserEnum = require("../constants/enums/typeUserEnum");

class ProductService {
  constructor(productModel) {
    this.product = productModel;
  }

  async getPivateFilteredProducts(options) {
    const { count, rows } = await this.product.findAndCountAll({
      where: options.where,
      order: options.order,
      offset: options.offset,
      limit: options.limit,
    });
    const totalPages = Math.ceil(count / options.limit);

    return {
      products: rows,
      totalProducts: count,
      totalPages,
      currentPage: options.offset / options.limit + 1,
    };
  }

  async getPaginatedProducts(options) {
    const { where, offset, limit, order } = options;

    const { count, rows } = await this.product.findAndCountAll({
      where,
      order,
      offset,
      limit,
    });
    const totalPages = Math.ceil(count / limit);
    return {
      products: rows,
      totalProducts: count,
      totalPages,
      currentPage: offset / limit + 1,
      
    };
  }

  buildQueryOptions(req) {
    const { name, typeProduct, totalStock } = req.query;
    const { offset, limit } = req.params;
    let typeUser = null;

    if (req.user) {
      typeUser = req.user.role;
    }

    if (typeProduct && !typeProductEnum.includes(typeProduct)) {
      return ERROR_MESSAGES.INVALID_TYPE_PRODUCT;
    }

    const where = {};

    if (req.user) {
      where.userId = req.user.id;
    }
    if (name) {
      where.name = { [Op.iLike]: `%${name}%` };
    }

    if (typeProduct) {
      where.typeProduct = typeProduct;
    }

    const options = {
      isAdmin: typeUser === typeUserEnum.ADMIN,
      order: [],
      where,
      offset: parseInt(offset) || DEFAULT_OFFSET,
      limit: parseInt(limit) || DEFAULT_LIMIT,
    };

    if (totalStock) {
      options.order = [["total_stock", req.query.totalStock]];
    }

    if (req.user) {
      options.where.userId = req.user.id;
    }

    return options;
  }
}

const productService = new ProductService(Product);

module.exports = productService;
