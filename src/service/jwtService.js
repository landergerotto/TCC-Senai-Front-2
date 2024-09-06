import { jwtDecode } from "jwt-decode";

const SECRET = "../env.js";

function decodeJWT(token) {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    return null;
  }
}

export { decodeJWT };
