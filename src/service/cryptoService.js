import CryptoJS from "crypto-js";
const SECRET = ".env";

function encryptData(data) {
  const json = JSON.stringify(data);
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(json),
    SECRET
  ).toString();
  return encryptedData;
}

function decrypt(encryptedData) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  return decryptedData;
}

export default {
    encryptData,
    decrypt
};