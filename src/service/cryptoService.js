import CryptoJS from "crypto-js";
const SECRET = "poe no dotenv";

function encryptData(data) {
  const json = JSON.stringify(data);
  const encryptedData = CryptoJS.AES.encrypt(json, SECRET).toString();
  return encryptedData;
}

function decrypt(encryptedData) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET);
  const decryptedString = bytes.toString(CryptoJS.enc.Utf8);

  const decryptedData = JSON.parse(decryptedString);

  if (!decryptedData)
    throw new Error("Algo deu errado tentando desencriptar as informações.");

  return decryptedData;
}

export default {
  encryptData,
  decrypt,
};
