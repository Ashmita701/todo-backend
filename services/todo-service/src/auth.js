const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    console.log(err,"err");
    return null;
  }
}

module.exports = { verifyToken };
