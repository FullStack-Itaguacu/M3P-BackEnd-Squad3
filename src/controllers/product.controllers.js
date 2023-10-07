const { Product } = require("../models/product");
const { HTTP_STATUS } = require("../constants/httpStatus");
const  ERROR_MESSAGES  = require("../constants/errorMessages");
const { Op } = require("sequelize");
const typeProductEnum = require("../constants/enums/typeProductEnum");
const { SUCESS_MESSAGE } = require("../constants/sucessMessage");
const productService = require("../services/product.services");


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

  getProducts1 = async (req, res) => {

    const userId = req.user.id; 
    console.log("userId", userId);
  
    const { name, typeProduct } = req.query;
    typeProductEnum

  
    const where = { userId }; 
  
    if(name) {
      where.name = { [Op.like]: `%${name}%` } 
    }
  
  
    if(typeProduct) {
      if(!typeProductEnum.includes(typeProduct)) {
        return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .send(ERROR_MESSAGES.INVALID_TYPE_PRODUCT);
      }else{
        where.typeProduct = typeProduct;
      }
    }
    
    let order = [];
  
    if(req.query.totalStock) {
      order.push(['totalStock', req.query.totalStock]);
    }
  
    try {
  
      const products = await Product.findAll({
        where,
        order  
      });
  
      if(products.length > 0) {
        res.status(HTTP_STATUS.OK).json(products);
      } else {
        res.status(HTTP_STATUS.NO_CONTENT)
        .send();
      }
  
    } catch (err) {
      console.error(err);
      res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .send(ERROR_MESSAGES.INTERNAL_SERVER_ERROR); 
    }
  
  }
  getProducts = async (req, res) => {


    try {

      const options = productService.buildQueryOptions(req);
      
     
      if(options.code === ERROR_MESSAGES.INVALID_TYPE_PRODUCT.code) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json(options);
      }
      
      let response;
      
      let filteredProducts = [];
      
      if(options.where) {
        
        filteredProducts = await productService.getFilteredProducts(options);
      } 
      
      if (options.isPaginated) {
        // faz paginação
        const paginated = await productService.getPaginatedProducts(options);
        
        response = paginated;
      } else {
        // sem paginação, usa filteredProducts
        response = filteredProducts; 
      }
  
      res.status(HTTP_STATUS.OK).json(response);
  
    } catch (error) {
      console.error(error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
    }


}
}


const productController = new ProductController();
module.exports = productController;
