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
        return res.status(200).json("Hotels!")

        
    } catch (error) {
        
        console.error(error);
        return res.status(500).json({ message: error});
    }
});

router.route('/:location/:price?').get(async (req, res) => {
    const location = req.params.location;
    const price = req.params.price;
  
    try {
      const redisExist = await client.exists(`hotels:${location}:price:${price || 'any'}`);
      if (redisExist) {
        console.log(`Hotels near ${location} with price ${price} found in cache`);
        const cache = await client.get(`hotels:${location}:price:${price || 'any'}`);
        return res.status(200).json(JSON.parse(cache));
      } else {
        console.log(`Searching for hotels near ${location} with price ${price}`);
        const response = await axios.get(`https://api.yelp.com/v3/businesses/search?term=hotels&location=${location}&price=${price || '1,2,3,4'}&limit=50`, {
          headers: {
            Authorization: `Bearer ${apiKey}`
          }
        });
  
        const result = response.data;
        if (!result || result.businesses.length === 0) {
          return res.status(404).json({ message: 'No hotels in location found' });
        }
  
        const cache = await client.set(`hotels:${location}:price:${price || 'any'}`, JSON.stringify(result));
        return res.status(200).json(result);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  });

  module.exports = router;