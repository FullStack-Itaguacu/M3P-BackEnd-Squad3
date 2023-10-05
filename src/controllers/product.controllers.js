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
        lab_name,
        image_link,
        dosage,
        unit_price,
        type_product,
        total_stock,
        user_id,
      } = req.body;

      if (!name) {
        return res
          .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
          .send(ERROR_MESSAGES.MANDATORY_FILLING);
      }
      if (!lab_name) {
        return res
          .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
          .send(ERROR_MESSAGES.MANDATORY_FILLING);
      }
      if (!image_link) {
        return res
          .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
          .send(ERROR_MESSAGES.MANDATORY_FILLING);
      }
      if (!dosage) {
        return res
          .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
          .send(ERROR_MESSAGES.MANDATORY_FILLING);
      }
      if (!unit_price || unit_price <= 0) {
        return res
          .status(HTTP_STATUS.REQ_FIELD)
          .send({ message: "Valor do medicamento deve ser maior que 0." });
      }
      if (
        type_product !== "Medicamento controlado" &&
        type_product !== "Medicamento não controlado"
      ) {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .send(ERROR.MESSAGE.MANDATORY_FILLING);
      }
      if (!total_stock || total_stock <= 0) {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .send(ERROR_MESSAGES.QUANTITY_ERROR);
      }
      const data = await Product.create({
        name,
        lab_name,
        image_link,
        dosage,
        unit_price,
        type_product,
        total_stock,
        user_id,
      });
      return res.status(HTTP_STATUS.OK).send(ERROR_MESSAGES.OK);
    } catch (error) {
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
    }
  }
}

const productController = new ProductController();
module.exports = productController;
