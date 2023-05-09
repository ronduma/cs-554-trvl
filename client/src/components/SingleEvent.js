import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Card, CardActionArea, CardMedia, Grid, Typography, 
  // makeStyles 
} from '@mui/material';
import no_image  from '../img/no_image.jpg'
function SingleEvent() {
    const {id} = useParams();
    const [eventData, setEventData] = useState({});
    const [error, setErrorCode] = useState(false);

    useEffect(() => {
      async function fetchEventData() {
        try{
          const response = await axios.get(`http://localhost:5000/eventByID/${id}`);
          console.log(response.data);
          setEventData(response.data);
        }
        catch(e){
          console.error(e);
          setErrorCode(true);
        }
      }
      fetchEventData();
    }, [id]);
    if(error){
      return(
        <div>
          <h2>Error 404: Out of Bounds</h2>
        </div>
      );
    }
    else{
      return (
        <div className="itinerary">
          <Link to="/itinerary">
            <button>Back to search</button>
          </Link>
          <br></br>
          <br></br>
          <Grid>
            <Grid justifyContent='center'>
              <Card className="bussiness" 
              // className={classes.card} 
              variant="outlined"
              sx={{
                maxWidth: 250,
                height: 'auto',
                marginLeft: 'auto',
                marginRight: 'auto',
                paddingBottom: '20px',
                borderRadius: 5,
                border: '1px solid #1e8678',
                boxShadow:
                  '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
              }}>
                <CardActionArea>
                  <CardMedia className='bussiness-img'
                    // className={classes.media}
                    component="img"
                    image={eventData.image_url ? eventData.image_url : no_image}
                    style={{ height: 155, objectFit: 'cover' }}
                    
                  />
                    <Typography
                      // className={classes.titleHead}
                      gutterBottom
                      variant="h6"
                      component="h1"
                    >
                      {eventData.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {eventData.location
                        ? eventData.location.address1 +
                        ", " +
                        eventData.location.city +
                        ", " +
                        eventData.location.state
                        : "No location provided"}
                    </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  {eventData.is_canceled ? 'Canceled' : 'Not Canceled'}
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  {eventData.category ? `Category: ${eventData.category}` : null}
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  {eventData.attending_count? `attending_count: ${eventData.attending_count}` : null }
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  {eventData.is_free ? 'Free to Join' : 'Need to Pay'}
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  {eventData.tickets_url ? `Tickets: ${eventData.tickets_url}` : null}
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  {eventData.description? `Description: ${eventData.description}` : null}
                </Typography>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
  
        </div>
      );
    }
}
export default SingleEvent;