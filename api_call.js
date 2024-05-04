const axios = require('axios');

let user_id = "BZPGGB";
let accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1JYRFoiLCJzdWIiOiJCWlBHR0IiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJlY2cgcnNldCByb3h5IHJwcm8gcm51dCByc2xlIHJjZiByYWN0IHJyZXMgcmxvYyByd2VpIHJociBydGVtIiwiZXhwIjoxNzE3MjE0MjYzLCJpYXQiOjE3MTQ2MjIyNjN9.q47M3d28ZEcCGPu1Xr2m4aNPPWVUjse-R3I8xOh9EtQ';
let date = "2024-04-30"
let stringObject;
const data_list = []; //[시간, 이동거리, 걸음수, 칼로리소모량]
async function fetchActivitySummary(accessToken) {
    try {
        const response = await axios.get("https://api.fitbit.com/1/user/" + user_id + "/activities/date/" + date + ".json", {
            headers: {
                "Authorization": "Bearer " + accessToken
            }
        });
        console.log(response.data);
        stringObject = JSON.stringify(response.data);
        console.log(stringObject);
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
//async function의 결과값을 그대로 exports를 했을경우 Promise객체가 넘겨져서 undefined로 표시되는 문제가 있었음
// -> 함수자체를 export하고 해당 모듈에서 .then을 이용해 처리하는 방식으로 해결
module.exports = {  
    fetchActivitySummary : fetchActivitySummary,
    accessToken : accessToken
}

