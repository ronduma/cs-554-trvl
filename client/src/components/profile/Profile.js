import React, {
  useState,  
  useEffect
} from 'react';
import { 
  useNavigate 
} from 'react-router-dom';

import axios from 'axios';

import UploadAndDisplayImage from './UploadAndDisplay';

import '../../App.css';
import {
  // Alert,
  Box,
  // Button,
  // FormControl,
  // IconButton,
  // Input,
  // InputAdornment,
  // InputLabel,
  TextField,
} from '@mui/material'

function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect (() => {
    console.log('/profile')
    axios.get('/profile', {
      withCredentials : true
    })
    .then (response => {
      if (!response.data){
        navigate('/login')
      }
      setUserData(response.data);
      setIsLoading(false);
    })
    .catch (error => {
      console.log(error)
      setIsLoading(false);
    });
  }, [navigate])

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
      <h1 className="Profile">
        Profile
      </h1>
      
      <UploadAndDisplayImage></UploadAndDisplayImage>
      <div>
        <TextField 
          id="outlined-basic" 
          label={userData.username}
          disabled
          variant="outlined" 
          sx={{ width: '100%' }}
        />
      </div>

    </Box>
  );
}

export default Profile;
