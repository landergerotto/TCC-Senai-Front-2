import { jwtDecode } from "jwt-decode";
import { apiUrl } from "../Api/apiUrl";

const SECRET = "../env.js";

function decodeJWT(token) {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    return null;
  }
}

function validadeJWT(token, email) {
  apiUrl
    .post('/auth/validatetoken')
    .then((response) => {
      console.log(response.data);
      if(response.data.valid == true) {
        console.log("User Válido");
      }
    })
    .catch((error) => {
      console.error("Houve um erro com a requisição: ", error);
    })
}

export { decodeJWT };
