import React, { useState } from 'react';

import '../App.css';
import {
  Box,
  Button,
  TextField,
} from '@mui/material'

function Register() {
  const [username, setUsername] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [confirmPassword, setConfirmPassword] = useState(undefined);

  const handleUsername = (event) => {
    setUsername(event.target.value);
    console.log(username)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value);
    console.log(password)
  }

  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
    console.log(confirmPassword)
  }

  return (
    <Box
      component="form"
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
        />
      </div>
      <div>
        <TextField 
          id="outlined-basic" 
          label="Password" 
          onChange={handlePassword}
          variant="outlined" 
        />
      </div>
      <div>
        <TextField 
          id="outlined-basic" 
          label="Confirm Password" 
          onChange={handleConfirmPassword}
          variant="outlined" 
        />
      </div>
      <Button
        onClick={() => {
          console.log(username, password, confirmPassword)
        }}
      >
        Submit
      </Button>
    </Box>
  );
}

export default Register;
