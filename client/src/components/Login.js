import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import '../App.css';
import {
  Alert,
  Box,
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
function Login() {
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect (() => {
    axios.get('/login', {
      withCredentials : true
    })
    .then (response => {
      console.log(response)
    })
    .catch (error => {
      console.log(error)
    });
  }, [])

  // const handleClickShowPassword = (event) => {
  //   setShowPassword(event.target.value);
  // }

  const handleClickPassword = (event) => {
    event.preventDefault();
    setShowPassword(true);
  };
  const handleLeavePassword = (event) => {
    event.preventDefault();
    setShowPassword(false);
  }
  const handleUsername = (event) => {
    setUsername(event.target.value);
  }
  const handlePassword = (event) => {
    setPassword(event.target.value);
  }
  return (
    <Box sx={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column'}} justifyContent="center" container alignItems="center">
      <h1>
        Login
      </h1>
      <div>
        <TextField
          id = "outlined-basic"
          label="Username"
          onChange={handleUsername}
          variant="outlined"
          value={username}
          margin="normal"
          sx={{width: '100%'}}
        />
      </div>
      <div>
        <TextField
          id="outlined-basic"
          label="Password"
          onChange={handlePassword}
          variant="outlined"
          type={showPassword ? 'text' : 'password'}
          value={password}
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  aria-label="toggle password visibility"
                  onMouseDown={handleClickPassword}
                  onMouseUp={handleLeavePassword}
                  onMouseLeave={handleLeavePassword}
                >
                  {showPassword ?  <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
          sx={{width: '100%'}}
        />
      </div>
      <Button variant="contained"
        onClick={() => {
          let data = {username : username, password : password};
          axios.post('http://localhost:5000/login', data, {
            withCredentials:true
          })
            .then(response => {
              console.log("response", response)
              if (response.data === "Success"){
                console.log("SUCCESS")
                navigate('/profile');
              }
            })
            .catch(error => {
              console.log(error.response.data.error)
              setErrorMessage(error.response.data.error)
            });
        }}
      >
        Submit
      </Button>
      {errorMessage && 
        <Alert severity="error">{errorMessage}</Alert >
      }
    </Box>
  );
}

export default Login;
