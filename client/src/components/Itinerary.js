import React, { useState } from 'react';
import '../App.css';

function Itinerary() {
  //we take in location and price
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');



  // these will handle changes
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  //boom we submit and check our server side 
  //return the results and map them with a button to add to profile grouped under only location
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // const response = await axios.get(`/api/yelp/${location}/${price}`);
      // console.log(response.data);
      // Do something with the response data, such as displaying the results
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='itinerary'>
      <h1>Let's Find Your Adventure Today!!!</h1>
    <div className="search-box">
      <h2>Search for a location</h2>
  <form onSubmit={handleSubmit}>
    <label class="location-label">
      Location:
      <input type="text" value={location} onChange={handleLocationChange} />
    </label>
    <label class="price-label">
      Price:
      <select value={price} onChange={handlePriceChange}>
        <option value="$">$</option>
        <option value="$$">$$</option>
        <option value="$$$">$$$</option>
        <option value="$$$$">$$$$</option>
      </select>
    </label>
    <button type="submit" class="search-button">Find Restaurants</button>
  </form>
    </div>
    </div>
  );
}

export default Itinerary;
