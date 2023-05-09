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

  const collectIds = (itineraryNumber, ids) => ({
    type: "COLLECT_IDS",
    payload: {
      itineraryNumber: itineraryNumber,
      ids: ids,
    },
  });

  module.exports = {
    handleAdd,
    handleRemove,
    setUserData,
    collectIds

  };