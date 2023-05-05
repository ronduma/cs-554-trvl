import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';

function Itinerary() {
  //we take in location and price
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('1');
  const [YelpData, setyelpAPI] = useState([]);
  const [error, setErrorCode] = useState(false);


  // these will handle changes
  const handleLocationChange = (event) => {
    console.log(event.target.name)
    setLocation(event.target.value);
  };

  const handlePriceChange = (event) => {
    console.log(event.target.name)
    setPrice(event.target.value);
  };

  //boom we submit and check our server side 
  //return the results and map them with a button to add to profile grouped under only location
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log("This is" + location)
      console.log("This price" + price)
      const response = await axios.get(`http://localhost:5000/itinerary/${location}/${price}`);
      console.log(response.data);
      setyelpAPI(response.data.businesses)
      // Do something with the response data, such as displaying the results
    } catch (error) {
      console.error(error);
      setErrorCode(true);
      
    }
  };

  if (error) {
    return (
      <div>
        <h2>Error 404:Out of Bounds</h2>
      </div>
    )
  }
  else {
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
        <option value="1">$</option>
        <option value="2">$$</option>
        <option value="3">$$$</option>
        <option value="4">$$$$</option>
      </select>
    </label>
    <button type="submit" class="search-button">Find Restaurants</button>
  </form>
  </div>
  {/* Change the following to make it a card and give options add and delete */}
  <ul>
  {YelpData && YelpData.length > 0 && YelpData.map((restaurant) => (
    <li key={restaurant.id}>
      <h3>{restaurant.name}</h3>
      <p>{restaurant.address}</p>
      <p>{restaurant.price}</p>
    </li>
  ))}
</ul>
    </div>
  );
}

}

export default Itinerary;
