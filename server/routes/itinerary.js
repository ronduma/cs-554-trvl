const express = require('express');
const axios = require('axios');
const router = express.Router();
const redis = require("redis");
const client = redis.createClient();
const itData = require('../data/collect')
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

router.route('/:location/:price?/randomize').get(async (req, res) => {
  const location = req.params.location;
  const price = req.params.price;
  console.log(location, price)
  const restaurants = await axios.get(`https://api.yelp.com/v3/businesses/search?location=${location}&price=${price || '1,2,3,4'}&limit=50`, {
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  })

  // generate 12 random restaurants
  let randomNumbers = [];
  let randomRestaurants = [];

  if (restaurants.data.businesses.length < 12){
    throw 'Error: Not enough data. Try a different location!'
  } 
  while(randomNumbers.length < 12) {
    let randomNumber = Math.floor(Math.random() * restaurants.data.businesses.length);
    if(!randomNumbers.includes(randomNumber)) {
      randomNumbers.push(randomNumber)
      randomRestaurants.push(restaurants.data.businesses[randomNumber]);
    }
  }

  // generate 3 random hotels 
  const hotels = await axios.get(`https://api.yelp.com/v3/businesses/search?term=hotels&location=${location}&price=${price || '1,2,3,4'}&limit=50`, {
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  })
  randomNumbers = [];
  randomHotels = [];
  if (hotels.data.businesses.length < 3){
    throw 'Error: Not enough data. Try a different location!'
  }
  while(randomNumbers.length < 3) {
    let randomNumber = Math.floor(Math.random() * hotels.data.businesses.length);
    if(!randomNumbers.includes(randomNumber)) {
      randomNumbers.push(randomNumber)
      randomHotels.push(hotels.data.businesses[randomNumber]);
    }
  }
  // console.log(randomHotels)

  // generate 3 random events
  const events = await axios.get(`https://api.yelp.com/v3/events?limit=50&location=${location}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  });
  randomNumbers = [];
  randomEvents = [];
  if (events.data.events.length < 3){
    throw 'Error: Not enough data. Try a different location!'
  }
  while(randomNumbers.length < 3) {
    let randomNumber = Math.floor(Math.random() * events.data.events.length);
    if(!randomNumbers.includes(randomNumber)) {
      randomNumbers.push(randomNumber)
      randomEvents.push(events.data.events[randomNumber]);
    }
  }
  // console.log(randomEvents)

  // generate 3 random museums
  const museums = await axios.get(`https://api.yelp.com/v3/businesses/search?location=${location}&categories=museums`, {
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  });
  randomNumbers = [];
  randomMuseums = [];
  if (museums.data.businesses.length < 3){
    throw 'Error: Not enough data. Try a different location!'
  }
  while(randomNumbers.length < 3) {
    let randomNumber = Math.floor(Math.random() * museums.data.businesses.length);
    if(!randomNumbers.includes(randomNumber)) {
      randomNumbers.push(randomNumber)
      randomMuseums.push(museums.data.businesses[randomNumber]);
    }
  }
  // console.log(randomRestaurants.length, randomHotels.length, randomEvents.length, randomMuseums.length)

  const itinerary1 = randomRestaurants.slice(0, 4).concat(randomHotels[0], randomEvents[0], randomMuseums[0]);
  const itinerary2 = randomRestaurants.slice(4, 8).concat(randomHotels[1], randomEvents[1], randomMuseums[1]);
  const itinerary3 = randomRestaurants.slice(8, 12).concat(randomHotels[2], randomEvents[2], randomMuseums[2]);

  return res.status(200).json({
    itinerary1 : itinerary1, 
    itinerary2 : itinerary2, 
    itinerary3 : itinerary3
  })
})

router.route('/:location/:price?').get(async (req, res) => {
    console.log("getting location")
    const location = req.params.location;
    const price = req.params.price;
    // console.log(location);

    try {
        // console.log(location)
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
        // console.log(result)
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