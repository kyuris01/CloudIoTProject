require('dotenv').config();
const AWS = require('aws-sdk');
const axios = require('axios');
const bucketName = 'team6fitbitdata';

AWS.config.update({
  region: 'ap-northeast-2',
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  apiVersion: 'latest'
});

const s3 = new AWS.S3();

function getObject(bucketName, key) {
  const params = {
    Bucket: bucketName,
    Key: key
  };

  return new Promise((resolve, reject) => {
    s3.getObject(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Body);
        console.log(data.Body.toString('utf-8'));
      }
      
    });
  });
}

getObject(bucketName, "BZPGGB/2024-04-30.json")