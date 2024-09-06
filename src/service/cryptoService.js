import CryptoJS from "crypto-js";
const SECRET = "poe no dotenv";

function encryptData(data) {
  const json = JSON.stringify(data);
  const encryptedData = CryptoJS.AES.encrypt(json, SECRET).toString();
  return encryptedData;
}

function decrypt(encryptedData) {
  console.log('11 - encrypted: ', encryptedData);
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET);
  const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
  
  console.log('15 - Decrypted String:', decryptedString);

  const decryptedData = JSON.parse(decryptedString);

  sessionStorage.setItem('token', decryptedData)

  return decryptedData;
}

export default {
  encryptData,
  decrypt,
};
