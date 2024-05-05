require('dotenv').config();
const nunjucks = require("nunjucks")
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 3000;


const AWS = require('aws-sdk');
const get_acc_token = require('./access_token');
const callData = require('./api_call');

let user_ID;
const client_ID = process.env.CLIENT_ID;
let access_token;



app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({ extended: true }));

// 정적 파일 서빙 (HTML 파일 제공)
app.use(express.static('public'));

app.set("view engine", "html")
nunjucks.configure("./views", {
    express:app
})

app.get('/', (req, res)=> {
    res.render("index.html");
})

// 특정 URL에 대한 POST 요청 처리
app.post('/authorize', cors(), (req, res) => {
    console.log('POST 요청이 들어옴:', req.body); // 요청 바디에 포함된 데이터 출력
    user_ID = req.body;

    const authCodeUrl = 'https://www.fitbit.com/oauth2/authorize';
    //const redirectUri = 'https://localhost:3000';
    const authorizationUrl = authCodeUrl + "?response_type=code&client_id=" + "23RXDZ" + "&scope=activity+cardio_fitness+electrocardiogram+heartrate+location+nutrition+oxygen_saturation+profile+respiratory_rate+settings+sleep+social+temperature+weight&code_challenge_method=S256&code_challenge=" + get_acc_token.code_challenge + "&state=" + get_acc_token.generateStateValue();
    
    res.send({authorizationUrl : authorizationUrl});
  
    
})

app.get('/buffer', (req,res)=> {
    res.render("redirect.html");
})

app.post('/redirect', (req, res) => {
    const url = require('url');
    const querystring = require('querystring');
    
    const receivedURL = req.body.variable;

    // URL을 구문 분석하여 쿼리 문자열을 가져옵니다.
    const parsedURL = url.parse(receivedURL);
    const queryString = parsedURL.query;

    // 쿼리 문자열을 파싱하여 객체로 변환합니다.
    const queryParams = querystring.parse(queryString);

    // 'code' 매개변수의 값을 추출합니다.
    const authorizationCode = queryParams.code; //인증코드추출

    console.log('Authorization Code:', authorizationCode);
    const params = new URLSearchParams(); //https://blog.naver.com/qls0147/222561243457
    params.append('grant_type', "authorization_code")
    params.append('code', authorizationCode)
    params.append('client_id', "23RXDZ")
    params.append('code_verifier', get_acc_token.code_verifier)
    axios.post(
        "https://api.fitbit.com/oauth2/token?client_id=" + "23RXDZ" + "&grant_type=authorization_code&code=" + authorizationCode + "&expires_in=2592000",
        params,
        {headers : {
            'Authorization': "Basic " + 'MjNSWERaOmMwOTUyNjYzMmFhNjQ0NDI4Njg1NzRhMjI1MzU0ZTc2', // 예름's Basic_Token == "Basic " + base64encode(client_id + ":" + client_secret)
            'Content-Type' : "application/x-www-form-urlencoded;charset=UTF-8"   
        }}
    )
    .then((response) => {
        console.log("This is response.data:" + response.data) //여기서 문제나는중.

        // const s3 = new AWS.S3();

        // AWS.config.update({
        //     region: 'ap-northeast-2',
        //     accessKeyId: process.env.AWS_ACCESS_KEY,
        //     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        //     apiVersion: 'latest'
        // })

        // callData.fetchActivitySummary(response.data.access_token)
        // .then(data => {
        //     console.log("data : ----------------");
        //     let params = {
        //         Bucket: "team6fitbitdata",
        //         Key:  "kyu" + "/" + "2024-05-01" + ".json", //data.user_id //data.date
        //         Body: JSON.stringify(data.stringObject)
        //     };
        //     console.log(params);
        //     s3.upload(params, function (err, data) {
        //         if(err) {
        //             throw err;
        //         }
        //         console.log("File uploaded successfully.");
        //     })
        // }); //api_call.js에서는 멀쩡하던 변수가 이 파일로 import하자 undefined로 사라졌음...

        
        
    })
    .catch((error) => console.error('요청오류: ', error));
})

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
})
