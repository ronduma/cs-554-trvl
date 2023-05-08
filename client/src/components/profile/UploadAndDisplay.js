import React, { useState } from "react";

import axios from 'axios';

import pfp from '../../img/pfp.jpg'

const UploadAndDisplayImage = () => {

  const [selectedImage, setSelectedImage] = useState(null);
  const [hasPic, setHasPic] = useState(false)

  const handleImageUpload = (event) => {
    event.preventDefault();
    console.log(event.target.files[0]);
    setSelectedImage(event.target.files[0]);
    setHasPic(true);
    const formData = new FormData();
    formData.append('image', selectedImage);

    axios.post('/profile/pfp', formData)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    })
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
      {/* {selectedImage && (
        <div>
          <img
            alt="not found"
            width={"250px"}
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <button onClick={() => 
          setSelectedImage(null)
          }>Remove</button>
        </div>
      )} */}

      <br />

      <form action="/profile/pfp" method="post" enctype="multipart/form-data">
        <input
          type="file"
          name="image"
          onChange={handleImageUpload}
        />
        <button type="submit">Upload</button>
      </form>
      
    </div>
  );
};

export default UploadAndDisplayImage;