import React, {
  useState, 
  useEffect
} from 'react';
import {Link, useLocation} from 'react-router-dom';

import '../App.css';
import {
  Typography
} from '@mui/material';

import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

import axios from 'axios';

function Navbar() {
  const [showProfile, setShowProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  useEffect (() => {
    setLoading(true);
    axios.get('/login', {
      withCredentials : true
    })
    .then (response => {
      // console.log(response)
      if (response.data){
        setShowProfile(true);
      } else {
        setShowProfile(false)
      }
      setLoading(false);
    })
    .catch (error => {
      console.log(error)
    });
  }, [location])
  if(loading){
    return(
    <Typography fontSize={24}>
      <div>
        Loading...
      </div>
  </Typography>);
  }
  else{
    return (
      <Typography
        fontSize={24}
      > 
        <div className="navbar">
          <div className="navbar-logo">
            <Link className="navbar-link" to="/">T R V L <DirectionsRunIcon></DirectionsRunIcon></Link>
          </div>
          <Link className="navbar-link" to="/itinerary">Itinerary</Link>
          <Link className="navbar-link" to="/community">Community</Link>
          {showProfile ? 
            <span>
              <Link className="navbar-link" to="/profile">Profile</Link> 
              <Link className="navbar-link" to="/logout">Logout</Link>
            </span>
          : null}
  
          {!showProfile ? 
            <span>
              <Link className="navbar-link" to="/register">Register</Link>
              <Link className="navbar-link" to="/login">Login</Link>
            </span>
          : null}
        </div>
      </Typography>
    );
  }
}

export default Navbar;
