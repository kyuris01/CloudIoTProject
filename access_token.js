const axios = require('axios');
const crypto = require('crypto');

const clientId = process.env.CLIENT_ID;

// 랜덤한 문자열 생성 함수
function generateRandomString(length) {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
}

function generateStateValue() {
  // 랜덤 바이트를 생성하여 base64로 인코딩
  const randomBytes = crypto.randomBytes(32);
  const stateValue = randomBytes.toString('base64');
  return stateValue;
}

// PKCE 코드 생성
function generatePKCEChallenge() {
  const verifier = generateRandomString(43); // 43바이트 길이의 랜덤 문자열 생성
  const challenge = crypto.createHash('sha256').update(verifier).digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, ''); // Base64 URL-Safe 인코딩
  return { verifier, challenge };
}
// 사용자에게 authorizationUrl로 리다이렉트하고, authorization code를 얻습니다.
const { verifier, challenge } = generatePKCEChallenge();

module.exports = {
  verifier:verifier,
  challenge:challenge,
  clientId:clientId,
  generateRandomString : generateRandomString,
  generatePKCEChallenge : generatePKCEChallenge,
  generateStateValue : generateStateValue
};