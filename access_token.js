const axios = require('axios');
const crypto = require('crypto');
const randomstring = require("randomstring");
const base64url = require("base64url");
const clientId = process.env.CLIENT_ID;
require('dotenv').config();

// 랜덤한 문자열 생성 함수
const code_verifier = randomstring.generate(128);

const base64Digest = crypto
  .createHash('sha256')
  .update(code_verifier)
  .digest("base64");

const code_challenge = base64url.fromBase64(base64Digest);

function generateStateValue() {
  // 랜덤 바이트를 생성하여 base64로 인코딩
  const randomBytes = crypto.randomBytes(32);
  const stateValue = randomBytes.toString('base64');
  return stateValue;
}


console.log("code_verifier :", code_verifier);
console.log("code_challenge :", code_challenge);
module.exports = {
  clientId:clientId,
  code_verifier:code_verifier,
  code_challenge:code_challenge,
  generateStateValue : generateStateValue
};