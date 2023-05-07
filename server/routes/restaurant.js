const express = require('express');
const axios = require('axios');
const router = express.Router();
const redis = require("redis");
const client = redis.createClient();
client.connect().then(() => {});

const apiKey ='PzubXsGTOr6esV9Io46ba7SHL6nN5GiX_BT39rtnwAIvnjEF8zNH2AencToseOklf2PJ4NoCH7barK0EkAX6jHl5AEFmu9sXI3tJAwYjV7f5xnKsrGVZqAXU9M5TZHYx'

// Single Resturant id
router.route('/:id').get(async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)

        // try redis
        const redisExist = await client.exists(`restaurantID${id}`);
        if (redisExist){
            console.log(`restaurant with id ${id} exists in redis`);
            const cache = await client.get(`restaurantID${id}`);
            return res.status(200).json(JSON.parse(cache));
        }
        else{
            console.log(`restaurant with id ${id} does not exist in redis`);
            const response = await axios.get(`https://api.yelp.com/v3/businesses/${id}`, {
                headers: {
                    Authorization: `Bearer ${apiKey}`
                }
            });
            const restaurant = response.data;
            if (!restaurant){
                return res.status(404).json({ message: 'No restaurant found' });
            }
            const cache = await client.set(`restaurantID${id}`, JSON.stringify(restaurant));
            console.log(restaurant);
            return res.status(200).json(restaurant);
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: error});
    }
});


module.exports = router;