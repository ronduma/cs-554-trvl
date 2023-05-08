import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import pfp from '../../img/pfp.jpg'

const UploadAndDisplayImage = () => {
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(null);
  const [hasPic, setHasPic] = useState(false)
  const [userData, setUserData] = useState(null);

  const handleButtonClick = (event) => {
    event.preventDefault();
    setHasPic(true);
    const formData = new FormData();
    formData.append('image', selectedImage);

    axios.post('/profile/pfp', formData)
    .then(response => {
      if (response.data){
        console.log("RESPONSE", response);
        setUserData(response.data)
        // console.log('userdata', userData.profilePic)
      }
    })
    .catch(error => {
      console.log(error);
    })
    navigate('/profile');
  }

  const handleImageUpload = (event) => {
    event.preventDefault();
    console.log(event.target.files[0]);
    setSelectedImage(event.target.files[0]);
  }

  return (
    <div>
      <div>Profile Picture</div>

      {!hasPic && (
      <img
        src={pfp}
        alt="pfp"
        width="100%"
      >
        
      </img>)}

      {userData && (
        <img
          src={"data:image/image/png;base64," + userData.profilePic.toString('base64')}
          width="100%"
          alt="pfp"
        />
      )}

      <br />

      <form action="/profile/pfp" method="post" enctype="multipart/form-data">
        <input
          type="file"
          name="image"
          onChange={handleImageUpload}
        />
        <button onClick={handleButtonClick} type="submit">Upload</button>
      </form>
      
    </div>
  );
};

export default UploadAndDisplayImage;