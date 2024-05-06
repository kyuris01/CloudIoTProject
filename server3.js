require('dotenv').config();
const AWS = require('aws-sdk');
const axios = require('axios');
const port = 3000;
const bodyParser = require("body-parser");
const express = require('express');
const app = express();
const bucketName = 'team6fitbitdata';

app.use(bodyParser.json());

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
            resolve(data.Body.toString('utf-8'));
        }
        
        });
    });
    }
      

const checkObject = async (userId, date) => {
    try {
      const object = await getObject(bucketName, `${userId}/${date}.json`)
      return object;
    } catch (err) {
      if (err.code === 'NoSuchKey') {
        return null
      } else {
        throw err
      }
    }
  }

const fetchActivitySummary = async (accessToken, userId, date) => {
    const object = await checkObject(userId, date)
    if (object !== null) return object
    //from here is the problem
    const response = await axios.get("https://api.fitbit.com/1/user/" + userId + "/activities/date/" + date +".json", {
        headers: {
            "Authorization": "Bearer " + accessToken
        }
        })
        console.log("response.data :" + response.data);
        stringObject = JSON.stringify(response.data);
        console.log("stringObject :" + stringObject);

        let params = {
            Bucket: "team6fitbitdata",
            Key:  userId + "/" + date + ".json", 
            Body: stringObject
        };

        s3.upload(params, function (err, data) {
            if(err) {
                throw err;
            }
            console.log("File uploaded successfully.");
        })

        return response.data;
// fitbit 호출
// S3에 저장하고
// fitbit 데이터 반환
}

//console.log(fetchActivitySummary("eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1JYRFoiLCJzdWIiOiJDMlhTV1IiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJlY2cgcnNldCByb3h5IHJwcm8gcm51dCByc2xlIHJjZiByYWN0IHJsb2MgcnJlcyByd2VpIHJociBydGVtIiwiZXhwIjoxNzE1MDA3NDg2LCJpYXQiOjE3MTQ5Nzg2ODZ9.xaOnlYKfJYvbD6vy4MRUZ4jnymQXnZTMXtsdzwUsoZ4", "BZPGGB", "2024-04-29"));

app.get('/',async  (req, res) => {
    console.log(req.query);
    const {userId, accessToken, date} = req.query;
    console.log(await fetchActivitySummary(accessToken, userId, date));
    const responseData = await fetchActivitySummary(accessToken, userId, date);
    res.json(responseData);
  });

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
