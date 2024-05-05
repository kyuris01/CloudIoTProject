const axios = require('axios');

let user_id = "C2XSWR"; //예름'sid : BZPGGB, 태규's id : C2XSWR
//let accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1JYRFoiLCJzdWIiOiJCWlBHR0IiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJlY2cgcnNldCByb3h5IHJwcm8gcm51dCByc2xlIHJjZiByYWN0IHJyZXMgcmxvYyByd2VpIHJociBydGVtIiwiZXhwIjoxNzE3MjE0MjYzLCJpYXQiOjE3MTQ2MjIyNjN9.q47M3d28ZEcCGPu1Xr2m4aNPPWVUjse-R3I8xOh9EtQ';
let date = "2024-05-01"
let stringObject;
const data_list = []; //[시간, 이동거리, 걸음수, 칼로리소모량]
async function fetchActivitySummary(accessToken) {
    try {
        const response = await axios.get("https://api.fitbit.com/1/user/" + user_id + "/activities/date/" + date + ".json", {
            headers: {
                "Authorization": "Bearer " + accessToken
            }
        });
        console.log("response.data" + response.data);
        stringObject = JSON.stringify(response.data);
        console.log("stringObject :" + stringObject);
        return { 
            stringObject: stringObject, // 데이터를 정상적으로 받은 후에 내보냄
            date: date,
            user_id: user_id
        };
    } catch (error) {
        console.error("Error fetching activity summary:", error);
        throw error; // 오류를 다시 던져서 호출자에게 전달
    }
}