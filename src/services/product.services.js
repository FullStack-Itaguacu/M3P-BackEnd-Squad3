const { Op } = require("sequelize");
const { Product } = require("../models/product");
const { DEFAULT_LIMIT, DEFAULT_OFFSET } = require("../constants/defaultsValue");
const typeProductEnum = require("../constants/enums/typeProductEnum");
const ERROR_MESSAGES = require("../constants/errorMessages");

class ProductService {
  constructor(productModel) {
    this.product = productModel;
  }

  async getFilteredProducts(where) {
  
    const products = await this.product.findAll({ 
      where: where.userId,
      order: where.order, 
     

    });
   
    return products;
  }


  async getPaginatedProducts(options) {
    const { where, order, offset, limit } = options;

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
    const { name, typeProduct,totalStock } = req.query;
    const { offset, limit } = req.params;

    if (typeProduct && !typeProductEnum.includes(typeProduct)) {
      return ERROR_MESSAGES.INVALID_TYPE_PRODUCT;
    }

    const where = {};

    if (name) {
      where.name = { [Op.iLike]: `%${name}%` };
    }

    if (typeProduct) {
      where.typeProduct = typeProduct;
    }
    
    let isOrdered = false;

    if (totalStock && !name && !typeProduct) {
      isOrdered = true;
      
    }

    const options = {
      isPaginated: !!limit,
      isOrdered ,
      order: [],
      where,
      offset: parseInt(offset) || DEFAULT_OFFSET,
      limit: parseInt(limit) || DEFAULT_LIMIT,
    };

    if (totalStock) {
      options.order = [['total_stock', req.query.totalStock]]; 
    }

    if (req.user) {
      options.where.userId = req.user.id;
      
    }

    return options;
  }
}

const productService = new ProductService(Product);

module.exports = productService;
