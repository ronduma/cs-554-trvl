const express = require('express');
const axios = require('axios');
const router = express.Router();
const redis = require('redis');
const client = redis.createClient();
const helpers = require('../helpers')
client.connect().then(()=>{})

const API_KEY = 'PzubXsGTOr6esV9Io46ba7SHL6nN5GiX_BT39rtnwAIvnjEF8zNH2AencToseOklf2PJ4NoCH7barK0EkAX6jHl5AEFmu9sXI3tJAwYjV7f5xnKsrGVZqAXU9M5TZHYx';

router.route('/').get(async (req, res) =>  {
    try{
        console.log('route: /login');
        return res.status(200).json("Events");
    }
    catch(error){
        console.error(error);
        return res.status(500).json({message: error});
    }
});
router.route('/:location/:is_free?').get(async(req, res) => {
    // console.log("balls");
    const location = req.params.location;
    const is_free = req.params.is_free;
    console.log(location);
    console.log(is_free);
    // console.log(is_free);
    try{
        const redisExist = await client.exists(`events:${location}:is_free:${is_free}`);
        if(redisExist){
            if(is_free !== undefined){
                console.log(`Events near ${location} with is_free = ${is_free} found in the cache`);
                const cache= await client.get(`events:${location}:is_free:${is_free}`);
                return res.status(200).json(JSON.parse(cache));
            }
            else{
                console.log(`Events near ${location} found in the cache`);
                const cache= await client.get(`events:${location}:is_free:${is_free}`);
                return res.status(200).json(JSON.parse(cache));
            }
        }
        else{
            console.log(`Searching for events near ${location} with is_free = ${is_free}`)
            let response = null;
            if(is_free !== undefined) {
                response = await axios.get(`https://api.yelp.com/v3/events?limit=50&location=${location}&is_free=${is_free}`, {
                headers: {
                    Authorization: `Bearer ${API_KEY}`
                }
            });
            }
            else {
                response = await axios.get(`https://api.yelp.com/v3/events?limit=50&location=${location}`, {
                headers: {
                    Authorization: `Bearer ${API_KEY}`
                }
            });
            }
            const result = response.data;
            if(!result || result.events.length === 0) {
                return res.status(404).json({message: 'No events within the location found'});
            }
            await client.set(`events:${location}:is_free:${is_free}`, JSON.stringify(result));
            return res.status(200).json(result);
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({message: error.message});
    }
});

module.exports = router;