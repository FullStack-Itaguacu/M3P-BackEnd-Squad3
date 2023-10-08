const { Product } = require("../models/product");
const { HTTP_STATUS } = require("../constants/httpStatus");
const ERROR_MESSAGES = require("../constants/errorMessages");
const { Op } = require("sequelize");
const typeProductEnum = require("../constants/enums/typeProductEnum");
const { SUCESS_MESSAGE } = require("../constants/sucessMessage");
class ProductController {
  listProductId = async (req, res) => {
    const { id } = req.params;
    try {
      const produto = await Product.findByPk(id);
      if (!produto) {
        return res.status(HTTP_STATUS.NOT_FOUND).send(SUCESS_MESSAGE.NOT_DATA);
      }
      return res.status(HTTP_STATUS.OK).send({ produto });
    } catch (error) {
      //console.log()
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
    }
  };

  getProducts = async (req, res) => {
    const userId = req.user.id;

    const { name, typeProduct } = req.query;
    typeProductEnum;

    const where = { userId };

    if (name) {
      where.name = { [Op.like]: `%${name}%` };
    }

    if (typeProduct) {
      if (!typeProductEnum.includes(typeProduct)) {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .send(ERROR_MESSAGES.INVALID_TYPE_PRODUCT);
      } else {
        where.typeProduct = typeProduct;
      }
    }

    let order = [];

    if (req.query.totalStock) {
      order.push(["totalStock", req.query.totalStock]);
    }

    try {
      const products = await Product.findAll({
        where,
        order,
      });

      if (products.length > 0) {
        res.status(HTTP_STATUS.OK).json(products);
      } else {
        res.status(HTTP_STATUS.NO_CONTENT).send();
      }
    } catch (err) {
      console.error(err);
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
    }
  };
  async createOneProduct(req, res) {
    try {
      const {
        name,
        labName,
        imageLink,
        dosage,
        unitPrice,
        typeProduct,
        totalStock,
        userId,
      } = req.body;

      if ((!name, !labName, !imageLink, !dosage)) {
        return res
          .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
          .send(ERROR_MESSAGES.MANDATORY_FILLING);
      }
      if (unitPrice <= 0) {
        return res
          .status(HTTP_STATUS.REQ_FIELD)
          .send(ERROR_MESSAGES.QUANTITY_ERROR);
      }
      if (
        typeProduct !== "Medicamento controlado" &&
        typeProduct !== "Medicamento não controlado"
      ) {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .send(ERROR.MESSAGE.MANDATORY_FILLING);
      }
      if (totalStock < 0) {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .send(ERROR_MESSAGES.QUANTITY_ERROR);
      }
      const data = await Product.create({
        name,
        labName,
        imageLink,
        dosage,
        unitPrice,
        typeProduct,
        totalStock,
        userId,
      });
      return res.status(HTTP_STATUS.OK).send(ERROR_MESSAGES.OK);
    } catch (error) {
      return res
        .status(HTTP_STATUS.USER_ADM)
        .send(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
    }
  }
}

const productController = new ProductController();
module.exports = productController;
