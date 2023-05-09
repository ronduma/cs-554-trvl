const express = require('express');
const axios = require('axios');
const router = express.Router();
const redis = require('redis');
const client = redis.createClient();
client.connect().then(()=>{});

const API_KEY='PzubXsGTOr6esV9Io46ba7SHL6nN5GiX_BT39rtnwAIvnjEF8zNH2AencToseOklf2PJ4NoCH7barK0EkAX6jHl5AEFmu9sXI3tJAwYjV7f5xnKsrGVZqAXU9M5TZHYx'

router.route('/').get(async(req, res) => {
    try{
        console.log('here');
        return res.status(200).json("Categories");
    }
    catch(error){
        console.error(error);
        return res.status(500).json({message: error});
    }
});

router.route('/:location/:categories?').get(async (req, res) => {
    const categories = req.params.categories;
    const location = req.params.location;
    try{
        const redisExist = await client.exists(`location:${location}:cateogries:${categories}`);
        if(redisExist){
            console.log(`Find places within the categories = ${categories} and location = ${location}`);
            const cache = await client.get(`location:${location}:cateogries:${categories || 'any'}`);
            console.log(JSON.stringify(cache))
            return res.status(200).json(JSON.parse(cache));
        }
        else{
            console.log(`Searching for places within categories = ${categories} and location = ${location}`);
            let response;
            if(categories === undefined){
                response = await axios.get(`https://api.yelp.com/v3/businesses/search?location=${location}&categories=museums`, {
                headers: {
                    Authorization: `Bearer ${API_KEY}`
                }
                });
            }
            else{
                response = await axios.get(`https://api.yelp.com/v3/businesses/search?location=${location}&categories=${categories}`, {
                headers: {
                    Authorization: `Bearer ${API_KEY}`
                }
            });
            }
            const result = response.data;
            if (!result || result.businesses.length === 0) {
                console.log('bruh');
                return res.status(404).json({ message: 'No places found within the categories' });
            }
            await client.set(`location:${location}:cateogries:${categories || 'any'}`, JSON.stringify(result));
            return res.status(200).json(result);
        }
    }catch(error){
        console.error(error);
        return res.status(500).json({message: error.message});
    }
});

module.exports = router;
