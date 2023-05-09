const express = require('express');
const axios = require('axios');
const router = express.Router();
const redis = require('redis');
const client = redis.createClient();
const helpers = require('../helpers')
client.connect().then(()=>{})

const API_KEY = 'PzubXsGTOr6esV9Io46ba7SHL6nN5GiX_BT39rtnwAIvnjEF8zNH2AencToseOklf2PJ4NoCH7barK0EkAX6jHl5AEFmu9sXI3tJAwYjV7f5xnKsrGVZqAXU9M5TZHYx';

router.route('/').get(async(req, res) => {
    try{
        console.log('route /getEventById');
        return res.status(200).json("EventById");
    }
    catch(error){
        console.error(error);
        return res.status(500).json({message: error});
    }
});

router.route('/:id').get(async (req, res) => {
    const id = req.params.id;

    try{
        const redisExist = await client.exists(`eventsID:${id}`);
        if(redisExist){
            console.log(`Event with id ${id} found in the cache`);
            const cache = await client.get(`eventsID:${id}`);
            return res.status(200).json(JSON.parse(cache));
        }
        else{
            console.log(`Searching for event with id ${id}`);
            const response = await axios.get(`https://api.yelp.com/v3/events/${id}`, {
                headers: {
                    Authorization: `Bearer ${API_KEY}`
                }
            });
            const event = response.data;
            console.log(event);
            if(!event){
                return res.status(404).json({message: 'No event with that id'});
            }
            await client.set(`eventID:${id}`, JSON.stringify(event));
            return res.status(200).json(event);
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message: error.message})
    }
});

module.exports = router;