import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, 
  // makeStyles 
} from '@mui/material';

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

function SingleResturant() {
  //we take in location and price
  const { id } = useParams();
  const [restaurantData, setRestaurantData] = useState({});
  const [error, setErrorCode] = useState(false);
  // const classes = useStyles();

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
        <Grid 
        container 
        // className={classes.grid} 
        spacing={5}>
          <Grid item xs={12}>
            <Card 
            // className={classes.card} 
            variant="outlined">
              <CardActionArea>
                <CardMedia
                  // className={classes.media}
                  component="img"
                  image={restaurantData.image_url || `No image`}
                  title={restaurantData.name}
                />
                <CardContent>
                  <Typography
                    // className={classes.titleHead}
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
