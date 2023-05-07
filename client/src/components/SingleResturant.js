import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { 
  Card, 
  CardActionArea, 
  CardContent, 
  CardMedia, 
  Grid, 
  Typography
} from '@mui/material';

function SingleResturant() {
  //we take in location and price
  const { id } = useParams();
  const [restaurantData, setRestaurantData] = useState({});
  const [error, setErrorCode] = useState(false);

  useEffect(() => {
    async function fetchRestaurantData() {
      try {
        const response = await axios.get(`http://localhost:5000/restaurants/${id}`);
        setRestaurantData(response.data);
      } catch (error) {
        console.error(error);
        setErrorCode(true);
      }
    }
    fetchRestaurantData();
  }, [id]);


  if (error) {
    return (
      <div>
        <h2>Error 404: Out of Bounds</h2>
      </div>
    );
  } else {
    return (
      <div className="itinerary">
        <Link to="/itinerary">
          <button>Back to search</button>
        </Link>
        <br></br>
        <br></br>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={restaurantData.image_url || `No image`}
                  title={restaurantData.name}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h3"
                  >
                    {restaurantData.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {restaurantData.location
                      ? restaurantData.location.address1 +
                      ", " +
                      restaurantData.location.city +
                      ", " +
                      restaurantData.location.state
                      : "No location provided"}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {restaurantData.price
                      ? restaurantData.price
                      : "No price information provided"}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {restaurantData.rating
                      ? restaurantData.rating + "/5"
                      : "No rating information provided"}
                  </Typography>
                  <Typography variant='body2' color='textSecondary' component='p'>
                {restaurantData.categories ? `Categories: ${restaurantData.categories.map(category => category.title).join(', ')}` : 'No category information provided'}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                {restaurantData.hours ? `Hours: ${restaurantData.hours[0].open.map(day => day.start.slice(0, -2) + ':' + day.start.slice(-2) + ' - ' + day.end.slice(0, -2) + ':' + day.end.slice(-2)).join(',\n')}` : 'No hours information provided'}
              </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }

}

export default SingleResturant;
