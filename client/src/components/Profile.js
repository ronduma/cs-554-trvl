import React, {
  useState,
  useEffect
} from 'react';
import {
  // useNavigate 
} from 'react-router-dom';

import axios from 'axios';

import '../App.css';
import {
  Alert,
  Box,
  Button,
  // FormControl,
  IconButton,
  // Input,
  InputAdornment,
  // InputLabel,
  TextField,
} from '@mui/material'

function Profile() {
  const [userData, setUserData] = useState(undefined);
  useEffect(() => {
    // console.log('/profile')
    // console.log(userData)
    axios.get('/profile', {
      withCredentials: true
    })
      .then(response => {
        // console.log(response)
        setUserData(response.data)
        // console.log(userData)
      })
      .catch(error => {
        console.log(error)
      });
  }, [])

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        width: "200px",
        margin: "0 auto",
      }}
    >
      <h2 className="Profile">
        Profile
      </h2>
      <div>
        <TextField
          id="outlined-basic"
          label={userData}
          disabled="true"
          variant="outlined"
          sx={{ width: '100%' }}
        />
      </div>

    </Box>
  );
}

export default Profile;
