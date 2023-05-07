import React, {
  // useState, 
  useEffect
} from 'react';
import { 
  // useNavigate 
} from 'react-router-dom';

import axios from 'axios';

function Profile() {
  useEffect (() => {
    axios.get('/profile', {
      withCredentials : true
    })
    .then (response => {
      console.log(response)
    })
    .catch (error => {
      console.log(error)
    });
  }, [])

  return (
    <div className="Profile">
      Profile
    </div>
  );
}

export default Profile;
