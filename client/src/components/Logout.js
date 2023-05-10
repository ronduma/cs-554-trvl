import React, {
  // useState,  
  useEffect
} from 'react';

import axios from 'axios';

import '../App.css';

function Logout() {
  useEffect (() => {
    axios.get('/logout', {
      withCredentials : true
    })
    .then (response => {
      console.log(response)
      localStorage.removeItem("user");
    })
    .catch (error => {
      console.log(error)
    });
  }, [])

  return (
    <div className="Logout">
      Successfully logged out.
    </div>
  );
}

export default Logout;
