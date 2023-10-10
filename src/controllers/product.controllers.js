const { Product } = require("../models/product");
const { HTTP_STATUS } = require("../constants/httpStatus");
const ERROR_MESSAGES = require("../constants/errorMessages");
const { Op } = require("sequelize");
const typeProductEnum = require("../constants/enums/typeProductEnum");
const { SUCESS_MESSAGE } = require("../constants/sucessMessage");
const productService = require("../services/product.services");
const productSchema = require("../constants/schemas/productSchema");

class ProductController {
  listProductId = async (req, res) => {
    const { id } = req.params;
    const user = req.user;
    try {
      if (!user || user.roles !== "Administrador") {
        const error = new Error(ERROR_MESSAGES.UNAUTHORIZED);
        error.status = HTTP_STATUS.UNAUTHORIZED;
        throw error;
      }
      const produto = await Product.findById(id);
      if (!produto) {
        const error = new Error(ERROR_MESSAGES.NOT_FOUND);
        error.status = HTTP_STATUS.NOT_FOUND;
        throw error;
      }
      return res.status(HTTP_STATUS.OK).send({ produto });
    } catch (error) {
      const errorMsg = error.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR;
      const errorStatus = error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR;
      return res
        .status(errorStatus)
        .send({ mensagem: errorMsg, erro: error.name, causa: error.cause });
    }
  };

  getProducts = async (req, res) => {
    try {
      const optionsQuery = productService.buildQueryOptions(req);

      if (optionsQuery.code === ERROR_MESSAGES.INVALID_TYPE_PRODUCT.code) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json(optionsQuery);
      }

      let response;

      if (optionsQuery.where) {
        const filteredProductsByUserId =
          await productService.getPivateFilteredProducts(optionsQuery);

        response = filteredProductsByUserId;
      }

      if (optionsQuery.isPaginated) {
        const filteredProductsPaginate =
          await productService.getPaginatedProducts(optionsQuery);

        response = filteredProductsPaginate;
      }

      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      console.error(error);
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
    }
  };

  updateProduct = async (req, res) => {
  
    const productMIddleware = req.product;
    const product = req.body;    
    try {

      const updatedProduct = await productMIddleware.update(product);

      return res.status(HTTP_STATUS.NO_CONTENT).send();
    } catch (error) {
      console.error(error);
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
    }
  };
}

const productController = new ProductController();
module.exports = productController;
