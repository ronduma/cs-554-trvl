import React, { 
  useState, 
  // useEffect 
} from "react";
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const UploadAndDisplayImage = (props) => {
  const navigate = useNavigate();
  const [uploadError, setUploadError] = useState(null)

  const [selectedImage, setSelectedImage] = useState(null);
  // const [userData, setUserData] = useState(props.userData);

  const handleButtonClick = (event) => {
    event.preventDefault();
    // setHasPic(true);
    const formData = new FormData();
    formData.append('image', selectedImage);

    axios.post('/profile/pfp', formData)
    .then(response => {
      if (response.data){
        console.log("RESPONSE", response);
        // setUserData(response.data)
        props.updateUserData(response.data);
        // console.log('userdata', userData.profilePic)
        navigate('/profile');
      }
    })
    .catch(error => {
      console.log(error);
      setUploadError(error.response.data.error);
    })
  }

  const handleImageUpload = (event) => {
    event.preventDefault();
    console.log(event.target.files[0]);
    setSelectedImage(event.target.files[0]);
    setUploadError(null);
  }

  return (
    <div>
      <div>Profile Picture</div>
      <br />
      <form action="/profile/pfp" method="post" enctype="multipart/form-data">
        <input
          type="file"
          name="image"
          onChange={handleImageUpload}
        />
        <button onClick={handleButtonClick} type="submit">Upload</button>
      </form>
      {uploadError && <div style={{color: "red"}}>{uploadError}</div>}
      
    </div>
  );
};

export default UploadAndDisplayImage;