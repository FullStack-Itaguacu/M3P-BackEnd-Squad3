const { Product } = require("../models/product");
const express = require("express");
const { HTTP_STATUS } = require("../constants/httpStatus");
const { ERROR_MESSAGES } = require("../constants/errorMessages");
class ProductController {
  async listProductId(req, res) {
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
  }
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
      if (totalStock <= 0) {
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
