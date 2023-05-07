import React, {
  useState, 
  useEffect
} from 'react';
import {Link, useLocation} from 'react-router-dom';

import '../App.css';
import {
  Typography
} from '@mui/material';

import axios from 'axios';

function Navbar() {
  const [showProfile, setShowProfile] = useState(false);
  const location = useLocation();
  useEffect (() => {
    axios.get('/login', {
      withCredentials : true
    })
    .then (response => {
      // console.log(response)
      if (response.data){
        setShowProfile(true);
      } else setShowProfile(false);
    })
    .catch (error => {
      console.log(error)
    });
  }, [location])

  return (
    <Typography
      fontSize={24}
    > 
      <div className="navbar">
        <div className="navbar-logo">
          <Link className="navbar-link" to="/">T R V L</Link>
        </div>
        <Link className="navbar-link" to="/itinerary">Itinerary</Link>
        <Link className="navbar-link" to="/community">Community</Link>
        {showProfile ? 
          <Link className="navbar-link" to="/profile">Profile</Link> 
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

export default Navbar;
