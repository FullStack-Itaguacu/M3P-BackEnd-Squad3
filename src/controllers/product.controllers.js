const { Product } = require("../models/product");
const { HTTP_STATUS } = require("../constants/httpStatus");
const ERROR_MESSAGES = require("../constants/errorMessages");
const { SUCESS_MESSAGE } = require("../constants/sucessMessage");
const productService = require("../services/product.services");

class ProductController {
  createProduct = async (req, res) => {
    const product = req.body;
    const userId = req.user.id;

    try {
      const createData = {
        name: product.name,
        labName: product.labName,
        imageLink: product.imageLink,
        dosage: product.dosage,
        typeDosage: product.typeDosage,
        unitPrice: product.unitPrice,
        totalStock: product.totalStock,
        typeProduct: product.typeProduct,
        description: product.description,
        userId,

      }
     
  
      const productCreated = await Product.create(
        createData
      );

      const formatDataResponseProductsCreated = {
        id: productCreated.id,
        name: productCreated.name,
        labName: productCreated.labName,
        imageLink: productCreated.imageLink,
        dosage: productCreated.dosage,
        typeDosage: productCreated.typeDosage,
        unitPrice: productCreated.unitPrice,
        totalStock: productCreated.totalStock,
        typeProduct: productCreated.typeProduct,
        description: productCreated.description,
        userId: productCreated.userId,
      };
     


      return res.status(HTTP_STATUS.CREATED).send(formatDataResponseProductsCreated);
    } catch (error) {
      console.error(error);
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send(ERROR_MESSAGES.FAILED_TO_CREATE);
    }
  };

  listProductId = async (req, res) => {
    const { id } = req.params;
    try {
      const produto = await Product.findByPk(id);
      if (!produto) {
        
        return res.status(HTTP_STATUS.NOT_FOUND).send(SUCESS_MESSAGE.NOT_DATA);
      }
      return res.status(HTTP_STATUS.OK).send({ produto });
    } catch (error) {

      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
    }
  };

  getProducts = async (req, res) => {
  
    try {
      const optionsQuery = productService.buildQueryOptions(req);

      if (optionsQuery.code === ERROR_MESSAGES.INVALID_TYPE_PRODUCT.code) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json(optionsQuery);
      }

      let response;

    
      if (optionsQuery.isAdmin) {
        const filteredProductsByUserId =
          await productService.getPivateFilteredProducts(optionsQuery);

        response = filteredProductsByUserId;
      }

      if (!optionsQuery.isAdmin) {
 
        const filteredProductsPaginate =
          await productService.getPaginatedProducts(optionsQuery);

        response = filteredProductsPaginate;
      }
   
  

      const filterContentData = response.products === undefined || response.products.length === 0;

      filterContentData ? res.status(HTTP_STATUS.NO_CONTENT).send(SUCESS_MESSAGE.NOT_DATA) : res.status(HTTP_STATUS.OK).send(response);
      

    } catch (error) {
      console.error(error);
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
    }
  };


  updateProduct = async (req, res) => {

    const productMIddleware = req.product;
    const product = {
      ...(req.body.name && {name: req.body.name}),
      ...(req.body.imageLink && {imageLink: req.body.imageLink}),
      ...(req.body.dosage && {dosage: req.body.dosage}),
      ...(req.body.totalStock && {totalStock: req.body.totalStock}),
      ...(req.body.unitPrice && {unitPrice: req.body.unitPrice})  
    };


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
