const bcrypt = require("bcrypt");

class PasswordHasher {
  constructor(saltRounds) {
    this.saltRounds = saltRounds;
  }

  async hashPassword(password) {
    const salt = await bcrypt.genSalt(this.saltRounds);
    const hashed = await bcrypt.hash(password, salt);
    return `${salt}:${hashed}`; // juntar salt e hash
  }

  async comparePassword(password, originalHash) {
    const [salt, originalHashed] = originalHash.split(":");
    const hashed = await bcrypt.hash(password, salt);
    return hashed === originalHashed;
  }
}

const passwordHasher = new PasswordHasher(10);

module.exports = passwordHasher;
