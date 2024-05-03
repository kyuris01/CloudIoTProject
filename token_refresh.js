const axios = require('axios');

const refreshToken = '89280f8689fcd3df645eaa0023b72afa0094f2544390168fe5e13c163b2d1fa4';
const AuthorizationCode = "MjNSWERaOmMwOTUyNjYzMmFhNjQ0NDI4Njg1NzRhMjI1MzU0ZTc2";
const client_id = "23RXDZ";

const params = new URLSearchParams(); //https://blog.naver.com/qls0147/222561243457
params.append('grant_type', "refresh_token")
params.append('refresh_token', refreshToken)
params.append('client_id', "23RXDZ")
params.append('expires_in',259200)
axios.post(
    "https://api.fitbit.com/oauth2/token?grant_type=refresh_token&refresh_token=" + refreshToken + "&client_id=" + client_id + "&expires_in=2592000",
    params,
    {headers : {
        'Authorization': "Basic " + AuthorizationCode,
        'Content-Type' : "application/x-www-form-urlencoded;charset=UTF-8"   
    }}
    )
    .then((response => console.log(response.data)))
    .catch(error => console.log(error.response.data));
