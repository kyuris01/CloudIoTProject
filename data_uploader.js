const AWS = require('aws-sdk');
const callData = require('./api_call');

require('dotenv').config();

AWS.config.update({
    region: 'ap-northeast-2',
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    apiVersion: 'latest'
});

const s3 = new AWS.S3();

callData.fetchActivitySummary(callData.accessToken)
.then(data => {
    let params = {
        Bucket: "team6fitbitdata",
        Key: data.user_id + "/" + data.date + ".json",
        Body: data.stringObject
    };

    s3.upload(params, function (err, data) {
        if(err) {
            throw err;
        }
        console.log("File uploaded successfully.");
    })
}); //api_call.js에서는 멀쩡하던 변수가 이 파일로 import하자 undefined로 사라졌음...







