import CryptoJS from 'crypto-js'

const encryptBase64 = (str: string) => {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(str))
}

const decryptBase64 = (str: string) => {
  return CryptoJS.enc.Base64.parse(str).toString(CryptoJS.enc.Utf8)
}

export { encryptBase64, decryptBase64 }
