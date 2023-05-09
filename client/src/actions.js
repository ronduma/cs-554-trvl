const handleAdd = (collectorid, character) => ({
    type: "COLLECT_RESTAURANT",
    payload: {collectorid: collectorid, character: character},
});
  
const handleRemove  = (collectorid,character) => ({
  type: "REMOVE_RESTUARANT",
  payload: {collectorid: collectorid, character: character},
});

const setUserData  = (userData) => ({
  type: "SET_USER_DATA",
  payload: userData,

});

// const handleAddItinerary = (id, itineraryData) => ({
//   type: "COLLECT_ITINERARY",
//   payload: {id : id, itineraryData: itineraryData}
// })

    
module.exports = {
  handleAdd,
  handleRemove,
  setUserData

};