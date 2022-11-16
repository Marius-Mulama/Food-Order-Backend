const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generatePassHash = async (password) => {
  return await bcrypt.hash(password, 10);
};

const validatePassword = async (password, savedPassword) => {
  return await bcrypt.compare(password, savedPassword);
};

const generateSignature = async (id, email, name, type) => {
  const token = jwt.sign(
    {
      userId: id,
      email: email,
      name: name,
      class: type,
    },
    process.env.JWT_KEY,
    {
      expiresIn: "15d",
    }
  );

  return token;
};

module.exports = { generatePassHash, validatePassword, generateSignature };
