const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    region: 'ap-northeast-2',
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    apiVersion: 'latest'
});

const s3 = new AWS.S3();
const stringObject = require('./api_call');
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~");
console.log(stringObject);

console.log("-----------------------");
console.log(stringObject);
// console.log("type1:"+ typeof activityData);
// console.log("type2:"+ typeof jsondata)
const params = {
    Bucket: "team6fitbitdata",
    Key: "data/ex3.json",
    Body: stringObject,
    function (err,data) {
        console.log(JSON.stringify(err) + " " + JSON.stringify(data));
      }
};

s3.upload(params, function (err, data) {
    if(err) {
        throw err;
    }
    console.log("File uploaded successfully.");
})

