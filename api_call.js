const axios = require('axios');

let user_id = "BZPGGB";
let accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1JYRFoiLCJzdWIiOiJCWlBHR0IiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJlY2cgcnNldCByb3h5IHJwcm8gcm51dCByc2xlIHJjZiByYWN0IHJyZXMgcmxvYyByd2VpIHJociBydGVtIiwiZXhwIjoxNzE3MjE0MjYzLCJpYXQiOjE3MTQ2MjIyNjN9.q47M3d28ZEcCGPu1Xr2m4aNPPWVUjse-R3I8xOh9EtQ';
let date = "2024-04-30"

const data_list = []; //[시간, 이동거리, 걸음수, 칼로리소모량]
async function fetchActivitySummary(accessToken) {
    const response = await axios.get("https://api.fitbit.com/1/user/" + user_id + "/activities/date/" + date + ".json", {
        headers: {
            "Authorization": "Bearer " + accessToken
        }
    });
    console.log(response.data);
    const stringObject = JSON.stringify(response.data);
    console.log("type:"+ typeof response.data);
    console.log(stringObject);
    module.exports = {stringObject : stringObject};
    //console.log(response.data.activities[0].duration); -->시간(ms)
    //console.log(response.data.summary.distances); -->이동거리
    //console.log(response.data.summary.steps); -->걸음수
    //console.log(response.data.summary.caloriesOut); -->칼로리소모량
}

fetchActivitySummary(accessToken);

