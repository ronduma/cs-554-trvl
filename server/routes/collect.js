const express = require('express');
const axios = require('axios');
const router = express.Router();
const redis = require("redis");
const client = redis.createClient();
const itData = require('../data/collect')
client.connect().then(() => {});

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

router.route('/:userId').post(async (req, res) => {
    try {
     const itinerary = req.body;
     const userId = req.params.userId;
    //  console.log(itinerary);
     console.log('bruh');
     const user = await itData.postItineraryToUser(userId, itinerary);
     console.log('bruh');
     return res.status(200).json(user);
    }
    catch (error) {
      return res.status(500).json({ message: `${error}`});
    }
});

router.route('/:userId/:name').delete(async (req, res) => {
    try {
        const itinerary_name = req.params.name;
        const userId = req.params.userId;
       //  console.log(itinerary);
        console.log('bruh');
        const user = await itData.deleteItineraryToUser(userId, itinerary_name);
        console.log('bruh');
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json({ message: `${error}`});
    }
})
module.exports = router;