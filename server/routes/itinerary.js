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

// Adjust this route to post iternary
router.route('/:userId').post(async (req, res) => {
    try {
        const {restaurantsid, hotelid, eventid } = req.body;
    
        // Call postItineraryToUser function to update the user's itinerary
        await postItineraryToUser(username, restaurantsid, hotelid, eventid);

        return res.status(200).json({ message: 'Itinerary updated successfully!' });
    
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error });
      }
});

router.route('/:location/:price?/randomize').get(async (req, res) => {
  const location = req.params.location;
  const price = req.params.price;
  console.log(location, price)
  const restaurants = await axios.get(`https://api.yelp.com/v3/businesses/search?location=${location}&price=${price || '1,2,3,4'}&limit=50`, {
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  })

  // generate 4 random restaurants
  let randomNumbers = [];
  let randomRestaurants = [];

  while(randomNumbers.length < 12) {
    let randomNumber = Math.floor(Math.random() * 50);
    if(!randomNumbers.includes(randomNumber)) {
      randomNumbers.push(randomNumber)
      randomRestaurants.push(restaurants.data.businesses[randomNumber]);
    }
  }

  console.log(randomRestaurants.length)

  const hotels = await axios.get(`https://api.yelp.com/v3/businesses/search?term=hotels&location=${location}&price=${price || '1,2,3,4'}&limit=50`, {
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  })

  randomNumbers = [];
  randomHotels = [];

  while(randomNumbers.length < 3) {
    let randomNumber = Math.floor(Math.random() * 50);
    if(!randomNumbers.includes(randomNumber)) {
      randomNumbers.push(randomNumber)
      randomHotels.push(restaurants.data.businesses[randomNumber]);
    }
  }

  console.log(randomHotels.length)

  return res.status(200).json({restaurants: randomRestaurants, hotels: randomHotels})
})

router.route('/:location/:price?').get(async (req, res) => {
    console.log("getting location")
    const location = req.params.location;
    const price = req.params.price;
    console.log(location);

    try {
        console.log(location)
        const redisExist = await client.exists(`location${location}:price:${price || 'any'}`);
        if (redisExist){
            console.log("location id is in redis")
            const cache = await client.get(`location${location}:price:${price || 'any'}`);
            return res.status(200).json(JSON.parse(cache));
          }
        else{
            console.log(`Location ${location} with price ${price} not in Redis`)
            const response = await axios.get(`https://api.yelp.com/v3/businesses/search?location=${location}&price=${price || '1,2,3,4'}&limit=50`, {
            headers: {
              Authorization: `Bearer ${apiKey}`
            }
          });

        // console.log(response.data)
        result = response.data;
        console.log(result)
        if (!result){
            return res.status(404).json({ message: 'No resturants in location found' });
        }
        const cache = await client.set(`location${location}:price:${price || 'any'}`, JSON.stringify(result));
        return res.status(200).json(result);

        }

        
    } catch (error) {
        
        console.error(error);
        return res.status(500).json({ message: error});
    }

});

module.exports = router;