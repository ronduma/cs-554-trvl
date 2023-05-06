import '../App.css';
import axios from 'axios';
import React, {useState} from 'react';
import {
  Box,
  FormControl,
  InputLabel, 
  OutlinedInput, 
  InputAdornment,
  IconButton,
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState(undefined);
  const [password, setPassword] = useState(undefined);

  const handleClickShowPassword = (event) => {
    setShowPassword(event.target.value);
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
    setShowPassword(true);
  };
  const handleMouseUpPassword = (event) => {
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
    <Box sx={{display: 'flex', flexWrap: 'wrap'}} justifyContent="center">
      <div>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id ="outlined-adornment-password"
            type = {showPassword ? 'text' : 'password'}
            endAdorment={
              <InputAdornment position="end">
                <IconButton
                  aria-label ="toggle password visibility"
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  onMouseLeave={handleMouseUpPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </div>
    </Box>
  );
}

export default Login;
