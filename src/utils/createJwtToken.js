const config = require("../config/config.server");
const { sign } = require("jsonwebtoken");


async function createJwtToken (user) {
  const { id, email, typeUser,fullName } = user;
  const payload = {
    id,
    email,
    fullName,
    role: typeUser,
  };
  const token = await sign(payload, config.jwtSecret);
  return token;
}

module.exports = { createJwtToken };