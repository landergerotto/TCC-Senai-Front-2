import jwt from 'jsonwebtoken';
const SECRET = "../env.js";

function generateJWT(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: "1h" });
}

function verifyJWT(token) {
  try {
    jwt.verify(token, SECRET);
    return { valid: true };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

function verifyAndDecodeJWT(token) {
  try {
    const decoded = jwt.verify(token, SECRET);
    return { valid: true, payload: decoded };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

function decodeJWT(token) {
  try {
    const decoded = jwt.decode(token);
    return decoded;
  } catch (error) {
    return null;
  }
}

export default {
  generateJWT,
  verifyJWT,
  verifyAndDecodeJWT,
  decodeJWT,
};
