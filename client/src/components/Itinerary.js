import React, { useState, 
  // useEffect 
} from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, 
  // makeStyles 
} from '@mui/material';
import actions, {handleAdd} from '../actions'
// const useStyles = makeStyles({
// 	card: {
// 		maxWidth: 550,
// 		height: 'auto',
// 		marginLeft: 'auto',
// 		marginRight: 'auto',
// 		borderRadius: 5,
// 		border: '1px solid #1e8678',
// 		boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
// 	},
// 	titleHead: {
// 		borderBottom: '1px solid #1e8678',
// 		fontWeight: 'bold'
// 	},
// 	grid: {
// 		flexGrow: 1,
// 		flexDirection: 'row'
// 	},
// 	media: {
// 		height: '100%',
// 		width: '100%'
// 	},
// 	button: {
// 		color: '#1e8678',
// 		fontWeight: 'bold',
// 		fontSize: 12
// 	}
// });

function Itinerary() {
  //we take in location and price
  const [location, setLocation] = useState('');
  const [need, setNeed] = useState('restuarant');
  const [price, setPrice] = useState('1');
  const [YelpData, setyelpAPI] = useState([]);
  const [error, setErrorCode] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [randomized, setRandomized] = useState([]);
  const [is_free, setFree] = useState('undefined');
  const [categories, setCategories] = useState('')
  // const classes = useStyles();
  // let card = null;
  
  
  const allCollectors = useSelector((state) => state.yelp);
  // console.log("HELLO")
  // console.log(allCollectors)
  const selectedCollector = allCollectors.filter(collector => collector.selected === true);
  // console.log("Current COllector ")
  // console.log(selectedCollector)
  let selectedCharacters = [];
  const dispatch=useDispatch();
  // these will handle changes

  const handleLocationChange = (event) => {
    // console.log(event.target.name)
    setLocation(event.target.value);
  };

  const handlePriceChange = (event) => {
    // console.log(event.target.name)
    setPrice(event.target.value);
  };
  const handleFreeChange = (event) => {
    console.log(event.target.name);
    setFree(event.target.value);
  };

  const handleNeed = (event) => {
    // console.log(event.target.name);
    setNeed(event.target.value);
  };  
  const handleCategories = (event) => {
    console.log("categories: "+ event.target.value);
    let lowercase = (event.target.value).toLowerCase();
    setCategories(lowercase);
  };
  
  if(selectedCollector !== undefined || selectedCollector !== null) {
    // console.log("selectedCollector")
    // console.log(selectedCollector[0].collections)
    selectedCharacters = selectedCollector[0].collections.map(character => character.id);
      // console.log("Selected Ids ", selectedCharacters);
  }
  const handleCollect = (collectorid, character) => {
    // console.log("We are trying to collect character")
    dispatch(actions.handleAdd(collectorid, {id: character.id, name: character.name, image: character.image_url, rating: character.rating}))
}
const handleGiveUp = (collectorid, character) => {
  // console.log("We are trying to delete character")
    dispatch(actions.handleRemove(collectorid, {id: character.id, name: character.name, image: character.image_url, rating: character.rating}))
}
const handleOnSubmit = (collectorid, character, action) => {
  if (action === "collect") {
    handleCollect(collectorid, character);
  } else if (action === "giveUp") {
    handleGiveUp(collectorid, character);
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
    console.log("response",randomized.restaurants)
    randomized.restaurants.forEach((restaurant) => {
      console.log(restaurant)
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (location === null || location === undefined || !location){
      return setErrorMessage('Location can not be blank');
    }
    else{
    try {
      // console.log("This is " + location)
      // console.log("This price" + price)
      // console.log("is Free " + is_free)
      let response;
      if (need === "hotel") {
        response = await axios.get(`http://localhost:5000/hotels/${location}/${price}`);
        setyelpAPI(response.data.businesses);
      }
      else if(need === 'event') {
        if(is_free === 'undefined'){
          response = await axios.get(`http://localhost:5000/events/${location}`)
          setyelpAPI(response.data.events);
        }
        else{
          response = await axios.get(`http://localhost:5000/events/${location}/${is_free}`)
          setyelpAPI(response.data.events); 
        }
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
      // console.log(response.data);
      // setyelpAPI(response.data.businesses)
      // Do something with the response data, such as displaying the results
    } catch (error) {
      console.error(error);
      setErrorCode(true);
      
    }
    }
  };
  const buildCard = (restaurant) => {
    const collected = selectedCharacters.includes(restaurant.id);
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
          {collected ? (
          <button
            onClick={() =>
              handleOnSubmit(selectedCollector[0], restaurant, "giveUp")
            }
          >
            Remove
          </button>
        ) : (
          <button
            onClick={() =>
              handleOnSubmit(selectedCollector[0], restaurant, "collect")
            }
          >
            Add
          </button>
        )}
        </Card>
      </Grid>
    );
  };
  const buildHotelCard = (hotel) => {
    const collected = selectedCharacters.includes(hotel.id);
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
          {collected ? (
          <button
            onClick={() =>
              handleOnSubmit(selectedCollector[0], hotel, "giveUp")
            }
          >
            Remove
          </button>
        ) : (
          <button
            onClick={() =>
              handleOnSubmit(selectedCollector[0], hotel, "collect")
            }
          >
            Add
          </button>
        )}
        </Card>
      </Grid>
    );
  };
  const buildCategoriesCard = (category) => {
    const collected = selectedCharacters.includes(category.id);
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
          {collected ? (
          <button
            onClick={() =>
              handleOnSubmit(selectedCollector[0], category, "giveUp")
            }
          >
            Remove
          </button>
        ) : (
          <button
            onClick={() =>
              handleOnSubmit(selectedCollector[0], category, "collect")
            }
          >
            Add
          </button>
        )}
        </Card>
      </Grid>
    );
  };
  const buildEventCard = (event) => {
    const collected = selectedCharacters.includes(event.id);
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
          {collected ? (
          <button
            onClick={() =>
              handleOnSubmit(selectedCollector[0], event, "giveUp")
            }
          >
            Remove
          </button>
        ) : (
          <button
            onClick={() =>
              handleOnSubmit(selectedCollector[0], event, "collect")
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
  if (errorMessage) {
    return (
      <div>
        <h2>Location does not exists</h2>
          
      </div>
    )
  }
  else {
  return (
    <div className='itinerary'>
      <h1>Let's Find Your Adventure Today!!!</h1>
    <div className="search-box">
      <h2>Search for a <select value={need} onChange={handleNeed}>
        <option value="restaurant">Restaurant</option>
        <option value="category">Category</option>
        <option value="hotel">Hotel</option>
        <option value="event">Event</option>
      </select></h2>
  <form onSubmit={handleSubmit}>
    <label className="location-label">
      Location:
      <input type="text" value={location} onChange={handleLocationChange} />
    </label>
    {(need ==='category') ?
    <label className="location-label">
      Specifcations (Default = Mueseums): 
      <input type="text" value={categories} onChange={handleCategories}/>
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
    <button onClick={generateRandom} type="submit" className="search-button">Randomize your trip!</button>
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
  {/* {randomized && (
    <Grid container spacing={5}>
      {randomized.restaurants.map((restaurant) => buildCard(restaurant))}
    </Grid>
  )} */}
  </ul>
  </div>
  );
}

}

export default Itinerary;
