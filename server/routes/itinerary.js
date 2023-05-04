const express = require('express');
const axios = require('axios');
const router = express.Router();
const redis = require("redis");
const client = redis.createClient();
client.connect().then(() => {});


const apiKey ='PzubXsGTOr6esV9Io46ba7SHL6nN5GiX_BT39rtnwAIvnjEF8zNH2AencToseOklf2PJ4NoCH7barK0EkAX6jHl5AEFmu9sXI3tJAwYjV7f5xnKsrGVZqAXU9M5TZHYx'

router.route('/').get(async (req, res) => {
    try {
        console.log("here")
        return res.status(200).json("Location!")

        
    } catch (error) {
        
        console.error(error);
        return res.status(500).json({ message: error});
    }

});

// router.route('/:price').get(async (req, res) => {
//     try {
//         const location = req.params.location;
//         console.log(location)

//         const response = await axios.get(`https://api.yelp.com/v3/businesses/search?location=${location}`, {
//             headers: {
//               Authorization: `Bearer ${apiKey}`
//             }
//           });
//         console.log(response)

//         return res.status(200).json(response);

        
//     } catch (error) {
        
//         console.error(error);
//         return res.status(500).json({ message: error});
//     }

// });

router.route('/:location').get(async (req, res) => {
    console.log("getting location")
    const location = req.params.location;
    console.log(location);
    try {
        console.log(location)
        const redisExist = await client.exists(`location${location}`);
        if (redisExist){
            console.log("location id is in redis")
            const cache = await client.get(`location${id}`);
            return res.status(200).json(JSON.parse(cache));
          }
        else{
            console.log("location id does not exists in cache")
            const response = await axios.get(`https://api.yelp.com/v3/businesses/search?location=${location}&limit=50`, {
            headers: {
              Authorization: `Bearer ${apiKey}`
            }
          });

        // console.log(response.data)
        result = response.data;
        if (!result){
            return res.status(404).json({ message: 'No resturants in location found' });
        }
        const cache = await client.set(`location${location}`, JSON.stringify(result));
        return res.status(200).json(result);

        }

        
    } catch (error) {
        
        console.error(error);
        return res.status(500).json({ message: error});
    }

});



module.exports = router;