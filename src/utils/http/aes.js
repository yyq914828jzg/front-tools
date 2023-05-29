import CryptoJS from 'crypto-js/crypto-js';
import jsrsasign from 'jsrsasign';
import { Base64 } from 'js-base64';

/* eslint no-underscore-dangle: 0 */
const myAes = {
  /**
   * 对请求数据进行加密加签
   * @param dataJson
   * @param mobile
   * @param encryptKey
   * @returns {*}
   */
  encryptAndSignData: (dataJson, mobile, encryptKey) => {
    // 对秘钥解密

    const decodedKey = Base64.decode(encryptKey);
    // aes key
    const aesKey = decodedKey.split('#####')[0];
    // 偏移量
    const iv = decodedKey.split('#####')[1];
    // 私钥
    const privateKey = decodedKey.split('#####')[2];

    // 请求数据加密前
    const data = JSON.stringify(dataJson);

    // 请求数据加密后
    const encryptedData = myAes.aesMinEncrypt(data, aesKey, iv);
    // 生成签名
    const sign = myAes.signData(data, privateKey);
    return `${encryptedData}###${sign}###${mobile}`;
  },

  /**
   * 对响应数据进行解密验签
   * @param responseStr
   * @param decryptKey
   * @returns {{data: null, retCode: string, retMsg: string}}
   */

  decryptAndSignData: (responseStr, decryptKey) => {
    // 对秘钥解密
    const decodedKey = Base64.decode(decryptKey);
    // aes key
    const aesKey = decodedKey.split('#####')[0];
    // 偏移量
    const iv = decodedKey.split('#####')[1];
    // 公钥
    const publicKey = decodedKey.split('#####')[2];
    const responseArray = responseStr.split('###');
    // 解密前的响应数据
    const responseData = responseArray[0];
    // 响应签名
    const responseSignature = responseArray[1];
    // 解密后的响应数据
    const decryptData = myAes.aesDecrypt(responseData, aesKey, iv).toString(CryptoJS.enc.Utf8);
    // 验签
    const b = myAes.verify(decryptData, responseSignature, publicKey);
    if (b) {
      return decryptData;
    }
    return {
      retCode: '990113',
      retMsg: '验签失败',
      data: null,
    };
  },
  /**
   * 加密
   * @param word
   * @param key
   * @param iv
   * @returns {*}
   */

  aesMinEncrypt: (word, key, iv) => {
    const _word = CryptoJS.enc.Utf8.parse(word);
    const _key = CryptoJS.enc.Utf8.parse(key);
    const _iv = CryptoJS.enc.Utf8.parse(iv);
    const encrypted = CryptoJS.AES.encrypt(_word, _key, {
      iv: _iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  },
  /**
   * 解密
   * @param word
   * @param key
   * @param iv
   * @returns {*}
   */
  aesDecrypt: (word, key, iv) => {
    const _key = CryptoJS.enc.Utf8.parse(key);
    const _iv = CryptoJS.enc.Utf8.parse(iv);
    const decrypted = CryptoJS.AES.decrypt(word, _key, {
      iv: _iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  },

  /**
   * 生成签名
   * @param data
   * @param privateKey
   * @returns {PromiseLike<ArrayBuffer> | * | null | string | undefined}
   */

  signData: (data, privateKey) => {
    const signature = new jsrsasign.KJUR.crypto.Signature({ alg: 'SHA1withRSA' });
    // 传入key实例, 初始化signature实例
    signature.init(privateKey);
    // 传入待签明文
    signature.updateString(data);
    // 签名, 得到16进制字符结果
    const a = signature.sign();
    return jsrsasign.hextob64(a);
  },

  /**
   * 验证签名
   * @param data
   * @param originalSignature
   * @param publicKey
   * @returns {undefined|void}
   */

  verify: (data, originalSignature, publicKey) => {
    // 验签
    const signatureVf = new jsrsasign.KJUR.crypto.Signature({ alg: 'SHA1withRSA', prvkeypem: publicKey });
    signatureVf.updateString(data);
    // 验签入参是16进制字符串，注意转码
    return signatureVf.verify(jsrsasign.b64tohex(originalSignature));
  },
};
export default myAes;
