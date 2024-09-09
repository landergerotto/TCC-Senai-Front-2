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

function validadeJWT(token, email) {
  console.log('token: ', token);
  console.log('email: ', email);
  apiUrl
    .post('/auth/validtoken', {Email: email, token: token})
    .then((response) => {
      console.log(response.data);
      if(response.data.valid == true) {
        console.log("User Válido");
        return response.data;
      }
    })
    .catch((error) => {
      console.error("Houve um erro com a requisição: ", error);
      return false;
    })
}

export { decodeJWT, validadeJWT };
