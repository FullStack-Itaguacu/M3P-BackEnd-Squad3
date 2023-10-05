const HTTP_STATUS = {
  OK: 200, //ok
  CREATED: 201, //criado
  BAD_REQUEST: 400, //requisição inválida
  UNAUTHORIZED: 401, //  não autorizado
  NOT_FOUND: 404, //não encontrado
  UNPROCESSABLE_ENTITY: 422, //dados inválidos
  CONFLICT: 409, //dados duplicadas
  INTERNAL_SERVER_ERROR: 500, //erro interno do servidor
};
module.exports = {
  HTTP_STATUS,
};
