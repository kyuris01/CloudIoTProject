require('dotenv').config();
const AWS = require('aws-sdk');
const axios = require('axios');
const bucketName = 'team6fitbitdata';
// const fetchActivitySummary = async (accessToken, userId, date) => {
//     // 1. S3에 데이터 있는지 확인 "${userId}/${date}.json" 요걸로 listObjects API 때리면 됨

    


//     // 2-1. 1번에서 없는 경우 이걸로 호출하고 S3에 저장
//     const response = await axios.get("https://api.fitbit.com/1/user/" + userId + "/activities/date/" + date + ".json", {
//         headers: {
//             "Authorization": "Bearer " + accessToken
//         }
//     });
//     console.log(response.data);
    

//     // 2-2. 1번에서 있는 경우 S3에서 호출

//     // 3. S3든 API 호출이든 받은 데이터 넘겨주기

//     stringObject = JSON.stringify(response.data);
//     console.log(stringObject);
//     return { 
//         stringObject: stringObject, // 데이터를 정상적으로 받은 후에 내보냄
//         date: date,
//         userId: userId
//     };
// }

AWS.config.update({
    region: 'ap-northeast-2',
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    apiVersion: 'latest'
});

const s3 = new AWS.S3();


function listObjects(bucketName) {
    const params = {
        Bucket: bucketName
    };
    
    return new Promise((resolve, reject) => {
        s3.listObjectsV2(params, (err, data) => {
        if (err) {
            reject(err);
        } else {
            resolve(data.Contents);
        }
        });
    });
    }
    

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
      

// 버킷명을 전달하여 객체 목록 조회



listObjects(bucketName)
.then(objects => {
    console.log(`Bucket ${bucketName} 내의 객체 목록:`);   
    objects.forEach(obj => 
    {
    //console.log(obj.Key);
    if(obj.Key === 'BZPGGB/2024-04-30.json' ) { //'${userId}/${date}.json' //s3에 동일한 객체명이 있는 경우
        console.log("check here");
        getObject(bucketName, obj.Key)
        process.exit(); //동일한 객체명 있는경우 데이터를 리턴한후 프로그램 종료
    }
    })
    
    

    })
.catch(err => {
    console.error('객체 목록을 가져오는 중 오류 발생:', err);
})


//s3에 동일한 객체명이 없는 경우
async function fetchActivitySummary() { //access_token, user_id, date 인자로 받아야함 //성공
    try {
        const response = await axios.get("https://api.fitbit.com/1/user/" + "C2XSWR" + "/activities/date/" + "2024-04-30" +".json", { //user_id,  date
            headers: {
                "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1JYRFoiLCJzdWIiOiJDMlhTV1IiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJlY2cgcnNldCByb3h5IHJudXQgcnBybyByc2xlIHJjZiByYWN0IHJsb2MgcnJlcyByd2VpIHJociBydGVtIiwiZXhwIjoxNzE0OTQ1NTk5LCJpYXQiOjE3MTQ5MTY3OTl9.2fc5r01ZZy_4rYgkj77i9XFzTbkLH8VGJCUkfi29VSc" //access_token
            }
        });
        console.log("response.data" + response.data);
        stringObject = JSON.stringify(response.data);
        console.log("stringObject :" + stringObject);
        
        let params = {
            Bucket: "team6fitbitdata",
            Key:  "C2XSWR" + "/" + "2024-04-30" + ".json", //data.user_id //data.date
            Body: JSON.stringify(stringObject)
        };
        
    
        
        s3.upload(params, function (err, data) {
            if(err) {
                throw err;
            }
            console.log("File uploaded successfully.");
        })

        return response.data; //s3에 동일한 객체명이 없는 경우 s3에 데이터를 저장하고 해당 데이터를 반환

    } catch (error) {
        console.error("Error fetching activity summary:", error);
        throw error; // 오류를 다시 던져서 호출자에게 전달
    }
}

fetchActivitySummary();

