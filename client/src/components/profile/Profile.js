import React, {
  useState,
  useEffect
} from 'react';
import {
  useNavigate
} from 'react-router-dom';

// D
import { useDispatch, useSelector } from 'react-redux';
import actions, { handleAdd } from '../../actions.js'

import axios from 'axios';

import UploadAndDisplayImage from './UploadAndDisplay';

import pfp from '../../img/pfp.jpg'

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
  // D testing
  const dispatch = useDispatch();
  const allCollectors = useSelector((state) => state.yelp);
  // console.log(allCollectors)
  const selectedCollector = allCollectors.filter(collector => collector.selected === true);
  // console.log("Current COllector ")                              
  // console.log(selectedCollector)
  let selectedCharacters = [];

  if (selectedCollector !== undefined && selectedCollector !== null) {
    // console.log("selectedCollector")
    // console.log(selectedCollector[0].collections)
    selectedCharacters = selectedCollector[0].collections.map(character => character.id);
    console.log("Selected Ids ", selectedCharacters);

  }

  const updateUserData = (newUserData) => {
    setUserData(newUserData);
  };

  useEffect(() => {
    // console.log('/profile')
    axios.get('/profile', {
      withCredentials: true
    })
      .then(response => {
        if (!response.data) {
          navigate('/login')
        }
        setUserData(response.data);
        // D testing 
        dispatch(actions.setUserData(response.data));
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error)
        setIsLoading(false);
      });
  }, [navigate])

  // useEffect (() => {
  //   console.log(hasPic)
  // }, [hasPic])
  console.log(allCollectors)
  console.log(userData);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
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

        {userData.profilePic ? (
          <img
            src={"data:image/image/png;base64," + userData.profilePic.toString('base64')}
            width="100%"
            alt="pfp"
          />
        )
          :
          <img
            src={pfp}
            alt="pfp"
            width="100%"
          >

          </img>
        }

        <UploadAndDisplayImage userData={userData} updateUserData={updateUserData}></UploadAndDisplayImage>
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
      {/* Save to backend */}
      {allCollectors.map(collector => (
        <div key={collector.id}>
          <div className='collectorContainer'>
            <label htmlFor="name">Collector: {collector.name}</label>
          </div>
          {collector.selected ?
            <div className='current-collector'>Current Collector</div> :
            'Not logined in'
          }
          <br></br>
          <div className='collection-container'>
            {collector.selected && collector.collections.length > 0 ?
              collector.collections.map((character, index) => (
                // buildCardT(character)
                <div className="container-box" key={index}>
                  <p className='container-name'>{character.name}</p>
                  <img className='container-image' src={character.image} alt={character.name} />
                  <p className='containers-ratings'>{character.rating}</p>
                  <button onClick={() => {
                    axios.post('/selected_characters', {
                      selectedCharacters: selectedCharacters
                    }, {
                      withCredentials: true
                    })
                      .then(response => {
                        console.log(response);
                        // Handle success response here
                      })
                      .catch(error => {
                        console.log(error);
                        // Handle error response here
                      })
                  }}>
                    Save Iternary
                  </button>
                </div>
              ))
              : ``
            }
          </div>
          <br></br>
          <br></br>
        </div>
      )
      )}
    </>
  );
}

export default Profile;
