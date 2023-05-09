import React, {
  useState, 
  useEffect,
  useContext
} from 'react';
import {AuthContext} from '../firebase/Auth';
import {NavLink, useLocation} from 'react-router-dom';

import '../App.css';
import {
  Typography
} from '@mui/material';

import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

import axios from 'axios';

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)
  return <div>{currentUser ? <NavigationAuth/> : <NavigationNonAuth/>}</div>
}

const NavigationAuth = () => {
  return (
    <Typography
      fontSize={24}
    > 
      <div className="navbar">
        <div className="navbar-logo">
          <NavLink className="navbar-link" to="/">T R V L <DirectionsRunIcon></DirectionsRunIcon></NavLink>
        </div>
        <NavLink className="navbar-link" to="/itinerary">Itinerary</NavLink>
        <NavLink className="navbar-link" to="/community">Community</NavLink>
        <NavLink className="navbar-link" to="/profile">Profile</NavLink> 
        <NavLink className="navbar-link" to="/logout">Logout</NavLink>
      </div>
    </Typography>
  )
}

const NavigationNonAuth = () => {
  return (
  <Typography
        fontSize={24}
      > 
    <div className="navbar">
      <div className="navbar-logo">
        <NavLink className="navbar-link" to="/">T R V L <DirectionsRunIcon></DirectionsRunIcon></NavLink>
      </div>
      <NavLink className="navbar-link" to="/itinerary">Itinerary</NavLink>
      <NavLink className="navbar-link" to="/community">Community</NavLink>
      <NavLink className="navbar-link" to="/register">Register</NavLink>
      <NavLink className="navbar-link" to="/login">Login</NavLink>
    </div>
  </Typography>
  )
}

export default Navbar;
