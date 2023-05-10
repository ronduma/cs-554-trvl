import React, 
{ useState, 
  // useEffect 
} from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import '../App.css';
import { 
  Box, 
  Card, 
  CardActionArea, 
  CardContent, 
  CardMedia, 
  Grid, 
  Typography, 
  // makeStyles 
} from '@mui/material';

import axios from 'axios';
import actions, {handleAdd} from '../actions'

function Itinerary() {
  //we take in location and price
  const [location, setLocation] = useState('');
  const [need, setNeed] = useState('restuarant');
  const [price, setPrice] = useState('1');
  const [YelpData, setyelpAPI] = useState([]);
  const [error, setErrorCode] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [randomized, setRandomized] = useState();
  const [is_free, setFree] = useState('undefined');
  const [categories, setCategories] = useState('')
  const [collected , setCollected] = useState([]);
  const [userID, setUserID] = useState('645ad422f7f565ca8e3ec513')
  // const classes = useStyles();
  // let card = null;
  
  
  // const allCollectors = useSelector((state) => state.yelp);

  // const selectedCollector = allCollectors.filter(collector => collector.selected === true);
  // let selectedCharacters = [];
  // const dispatch=useDispatch();

  // these will handle changes
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  const handleFreeChange = (event) => {
    console.log(event.target.name);
    setFree(event.target.value);
  };

  const handleNeed = (event) => {
    setNeed(event.target.value);
  };  
  const handleCategories = (event) => {
    console.log("categories: "+ event.target.value);
    let lowercase = (event.target.value).toLowerCase();
    setCategories(lowercase);
  };
  
  // if(selectedCollector !== undefined || selectedCollector !== null) {
  //   selectedCharacters = selectedCollector[0].collections.map(character => character.id);
  // }
  const handleCollect = (character) => {
    // collectorid, {id: character.id, name: character.name, image: character.image_url, rating: character.rating}))
    if(collected.length === 0){
      setCollected([character]);
      // console.log(collected)
    }
    else{
      setCollected([...collected, character])
      // console.log(collected);
    }

    axios.post(`http://localhost:5000/collect/${userID}`, character);
  }
  const handleGiveUp = (character) => {
      // dispatch(actions.handleRemove(collectorid, {id: character.id, name: character.name, image: character.image_url, rating: character.rating}))
      const filteredItems = collected.filter(item => item !== character);
      setCollected(filteredItems);
      axios.delete(`http://localhost:5000/collect/${userID}/${character.name}`);
  }
  const handleOnSubmit = (character, action) => {
    console.log(character);
    if (action === "collect") {
      handleCollect(character);
    } else if (action === "giveUp") {
      handleGiveUp(character);
    }
  };

  //boom we submit and check our server side 
  //return the results and map them with a button to add to profile grouped under only location
  const generateRandom = async() => {
    if (location === null || location === undefined || !location){
      return setErrorMessage('Location can not be blank');
    }
    let random = await axios.get(`http://localhost:5000/itinerary/${location}/${price}/randomize`);
    setyelpAPI([])
    setRandomized(random.data)
    console.log("response", randomized.itinerary1)
  }
  console.log(collected);
  // const checkIfExists =async(item) => {
  //   return collected.includes(item);
  // }
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (location === null || location === undefined || !location){
      return setErrorMessage('Location can not be blank');
    }
    else{
    try {
      let response;
      if (need === "hotel") {
        response = await axios.get(`http://localhost:5000/hotels/${location}/${price}`);
        setyelpAPI(response.data.businesses);
      }
      else if(need === 'event') {
          response = await axios.get(`http://localhost:5000/events/${location}/${is_free}`)
          setyelpAPI(response.data.events); 
      }
      else if (need === 'category'){
        response = await axios.get(`http://localhost:5000/categories/${location}/${categories}`); 
        setyelpAPI(response.data.businesses);
      } 
      else {
        response = await axios.get(`http://localhost:5000/itinerary/${location}/${price}`);
        setyelpAPI(response.data.businesses);
      }
      // const response = await axios.get(`http://localhost:5000/itinerary/${location}/${price}`);
      console.log(response.data);
      // setyelpAPI(response.data.businesses)
      // Do something with the response data, such as displaying the results
    } catch (error) {
      console.error(error);
      setErrorCode(true);
      
    }
    }
  };
  const buildCard = (restaurant) => {
    // const collected = selectedCharacters.includes(restaurant.id);
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={restaurant.id}>
        <Card 
        // className={classes.card} 
        variant='outlined'>
          <CardActionArea>
          <Link to={`/itinerary/${restaurant.id}`}>
            <CardMedia
              // className={classes.media}
              component='img'
              image={restaurant.image_url || `No image`}
              title={restaurant.name}
            />
  
            <CardContent>
              <Typography 
              // className={classes.titleHead} 
              gutterBottom variant='h6' 
              component='h3'>
                {restaurant.name}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                {restaurant.location ? restaurant.location.address1 + ', ' + restaurant.location.city + ', ' + restaurant.location.state : 'No location provided'}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                {restaurant.price ? restaurant.price : 'No price information provided'}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                {restaurant.rating ? restaurant.rating + '/5' : 'No rating information provided'}
              </Typography>
            </CardContent>
            </Link>
          </CardActionArea>
          {/* button for collecting */}
          (
          <button
            onClick={() =>
              handleOnSubmit(restaurant, "giveUp")
            }
          >
            Remove
          </button>
          <button
            onClick={() =>
              handleOnSubmit(restaurant, "collect")
            }
          >
            Save to Profile
          </button>
        )
        </Card>
      </Grid>
    );
  };
  const buildHotelCard = (hotel) => {
    // const collected = selectedCharacters.includes(hotel.id);
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={hotel.id}>
        <Card variant='outlined'>
          <CardActionArea>
          <Link to={`/itinerary/${hotel.id}`}>
            <CardMedia
              component='img'
              image={hotel.image_url || `No image`}
              title={hotel.name}
            />
  
            <CardContent>
              <Typography gutterBottom variant='h6' component='h3'>
                {hotel.name}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                {hotel.location ? hotel.location.address1 + ', ' + hotel.location.city + ', ' + hotel.location.state : 'No location provided'}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                {hotel.price ? hotel.price : 'No price information provided'}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                {hotel.rating ? hotel.rating + '/5' : 'No rating information provided'}
              </Typography>
            </CardContent>
            </Link>
          </CardActionArea>
          {/* button for collecting */}
          (
          <button
            onClick={() =>
              handleOnSubmit(hotel, "giveUp")
            }
          >
            Remove
          </button>
          <button
            onClick={() =>
              handleOnSubmit(hotel, "collect")
            }
          >
            Add
          </button>
        )
        </Card>
      </Grid>
    );
  };
  const buildCategoriesCard = (category) => {
    // const collected = selectedCharacters.includes(category.id);
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={category.id}>
        <Card variant='outlined'>
        <Link to={`/itinerary/${category.id}`}>
          <CardActionArea>
            <CardMedia
              component='img'
              image={category.image_url || `No image`}
              title={category.name}
            />
            
            <CardContent>
              <Typography gutterBottom variant='h6' component='h3'>
                {category.name}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                {category.location ? category.location.address1 + ', ' + category.location.city + ', ' + category.location.state : 'No location provided'}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                {category.price ? category.price : 'No price information provided'}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                {category.rating ? category.rating + '/5' : 'No rating information provided'}
              </Typography>
            </CardContent>
          </CardActionArea>
          </Link>
          {/* button for collecting */}
         (
          <button
            onClick={() =>
              handleOnSubmit(category, "giveUp")
            }
          >
            Remove
          </button>
        ) : (
          <button
            onClick={() =>
              handleOnSubmit(category, "collect")
            }
          >
            Add
          </button>
        )
        </Card>
      </Grid>
    );
  };
  const buildEventCard = (event) => {
    // const collected = selectedCharacters.includes(event.id);
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={event.id}>
        <Card variant='outlined'>
          <CardActionArea>
          <Link to={`/events/${event.id}`}>
            <CardMedia
              component='img'
              image={event.image_url || `No image`}
              title={event.name}
            />
  
            <CardContent>
              <Typography gutterBottom variant='h6' component='h3'>
                {event.name}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                {event.location ? event.location.address1 + ', ' + event.location.city + ', ' + event.location.state : 'No location provided'}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                {event.is_free ? "Free Event" : 'Need to Pay'}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                {event.rating ? event.rating + '/5' : 'No rating information provided'}
              </Typography>
            </CardContent>
            </Link>
          </CardActionArea>
          {/* button for collecting */}
          {collected.includes(event) ? (
          <button
            onClick={() =>
              handleOnSubmit( event, "giveUp")
            }
          >
            Remove
          </button>
        ) : (
          <button
            onClick={() =>
              handleOnSubmit( event, "collect")
            }
          >
            Add
          </button>
        )}
        </Card>
      </Grid>
    );
  };

  if (error) {
    return (
      <div>
        <h2>Error 404:Out of Bounds</h2>
      </div>
    )
  }
  else {
  return (
    <div className='itinerary'>
      <h1>Let's Find Your Adventure Today!!!</h1>

      <div className="search-box">
        <h2>Search for a 
          <select value={need} onChange={handleNeed}>
            <option value="restaurant">Restaurant</option>
            <option value="category">Category</option>
            <option value="hotel">Hotel</option>
            <option value="event">Event</option>
          </select>
        </h2>

  <form onSubmit={handleSubmit}>
    <label className="location-label">
      Location:
      <input type="text" value={location} onChange={handleLocationChange} />
    </label>
    {(need ==='category') ? 
    <label className="location-label">
      Specifcations:
      <input type="text" value={categories} onChange={handleCategories} />
    </label> 
    : null}
    {(need === 'event'  ? 
    <label className="price-label">
      Free:
      <select value={is_free} onChange={handleFreeChange}>
        <option value="undefined"> </option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
    </label>
    :
    <label className="price-label">
      Price:
      <select value={price} onChange={handlePriceChange}>
        <option value="1">$</option>
        <option value="2">$$</option>
        <option value="3">$$$</option>
        <option value="4">$$$$</option>
      </select>
    </label>
    )}
    <button type="submit" className="search-button">Explore</button>
  </form>
    <h2>Feeling Lucky?</h2>
    <button onClick={generateRandom} type="submit" className="search-button" >Randomize your trip!</button>
  {errorMessage && (
        <div className="error-message">{errorMessage}</div>
      )}
  </div>
  {/* Change the following to make it a card and give options add and delete */}
  <ul>
  {/* {YelpData && YelpData.length > 0 && (
     <Grid 
     container 
    //  className={classes.grid} 
     spacing={5}>
         {YelpData.map((restaurant) => buildCard(restaurant))}
     </Grid>
  )} */}
  {YelpData && YelpData.length > 0 && need === 'restuarant' &&(
     <Grid container spacing={5}>
         {YelpData.map((restaurant) => buildCard(restaurant))}
     </Grid>
  )}
   {YelpData && YelpData.length > 0 && need === 'hotel' &&(
     <Grid container spacing={5}>
         {YelpData.map((restaurant) => buildHotelCard(restaurant))}
     </Grid>
  )}
   {YelpData && YelpData.length > 0 && need === 'event' &&(
     <Grid container spacing={5}>
         {YelpData.map((restaurant) => buildEventCard(restaurant))}
     </Grid>
  )}
  {YelpData && YelpData.length > 0 && need === 'category' &&(
     <Grid container spacing={5}>
         {YelpData.map((category) => buildCategoriesCard(category))}
     </Grid>
  )}
  {randomized && (
    <div>
      <Box
        bgcolor="lightgray"
      >
        <h3>Itinerary 1</h3>
        <Grid container spacing={0}>
          {randomized.itinerary1.map((item) => buildCard(item))}
        </Grid>
      </Box>
      <Box
        bgcolor="lightgray"
      >
        <h3>Itinerary 2</h3>
        <Grid container spacing={0}>
          {randomized.itinerary2.map((item) => buildCard(item))}
        </Grid>
      </Box>
      <Box
        bgcolor="lightgray"
      >
        <h3>Itinerary 3</h3>
        <Grid container spacing={0}>
          {randomized.itinerary3.map((item) => buildCard(item))}
        </Grid>
      </Box>
    </div>   
  )}
  </ul>
  </div>
  );
}

}

export default Itinerary;
