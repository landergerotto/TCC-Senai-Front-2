import { jwtDecode } from "jwt-decode";
import { apiUrl } from "../Api/apiUrl";

function decodeJWT(token) {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    return null;
  }
}

async function validateJWT(token, email) {
  try {
    const response = await apiUrl.post("/auth/validate", {
      Email: email,
      token: token,
    });
    if (response.data.valid) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Houve um erro com a requisição: ", error);
    return false;
  }
}

export { decodeJWT, validateJWT };
