import React, { useState } from 'react';

import axios from 'axios';

import '../App.css';
import {
  Box,
  Button,
  // FormControl,
  IconButton,
  // Input,
  InputAdornment,
  // InputLabel,
  TextField,
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Register() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
    setShowPassword(true);
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
    setShowPassword(false);
  };
  const [username, setUsername] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [confirmPassword, setConfirmPassword] = useState(undefined);

  const handleUsername = (event) => {
    setUsername(event.target.value);
    // console.log(username)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value);
    // console.log(password)
  }

  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
    // console.log(confirmPassword)
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
      <div>
        Register
      </div>
      <div>
        <TextField 
          id="outlined-basic" 
          label="Username" 
          onChange={handleUsername}
          variant="outlined" 
          sx={{ width: '100%' }}
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
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  onMouseLeave={handleMouseUpPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ width: '100%' }}
        />
      </div>
      <div>
        <TextField 
          id="outlined-basic" 
          label="Confirm Password" 
          onChange={handleConfirmPassword}
          variant="outlined" 
          type={showPassword ? 'text' : 'password'}
          value={confirmPassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  onMouseLeave={handleMouseUpPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ width: '100%' }}
        />
      </div>
      <Button
        onClick={() => {
          let data = {username : username, password : password, confirmPassword : confirmPassword};
          axios.post('http://localhost:5000/register', data)
            .then(response => {
              console.log(response)
            })
            .catch(error => {
              console.log(error.response.data.error)
            });
        }}
      >
        Submit
      </Button>
    </Box>
  );
}

export default Register;
