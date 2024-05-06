const axios = require('axios');

const userId = "C2XSWR";
const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1JYRFoiLCJzdWIiOiJDMlhTV1IiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJlY2cgcnNldCByb3h5IHJwcm8gcm51dCByc2xlIHJjZiByYWN0IHJsb2MgcnJlcyByd2VpIHJociBydGVtIiwiZXhwIjoxNzE1MDA3NDg2LCJpYXQiOjE3MTQ5Nzg2ODZ9.xaOnlYKfJYvbD6vy4MRUZ4jnymQXnZTMXtsdzwUsoZ4";


const fetchFriendsID = async (accessToken, userId) => {
  const response = await axios.get("https://api.fitbit.com/1.1/user/-/friends.json", {
        headers: {
            "Authorization": "Bearer " + accessToken
        }
        })
        const friendsList = [];
        //console.log("response.data :" + response.data);
        stringObject = JSON.stringify(response.data);
        parseObject = JSON.parse(stringObject);
        //console.log("stringObject :" + stringObject);
        //console.log(typeof parseObject.data);
        //console.log(parseObject.data[0].id);
        for(let i = 0; i < parseObject.data.length ; i++)
        {
          friendsList.push(parseObject.data[i].id);
          //console.log(parseObject.data[i].id);
        }
        for(let i = 0; i < friendsList.length ; i++)
        {
          console.log(friendsList[i]);
        }

}

fetchFriendsID(accessToken, userId);


      