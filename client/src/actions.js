const handleAdd = (collectorid, character) => ({
    type: "COLLECT_RESTAURANT",
    payload: {collectorid: collectorid, character: character},
});
  
  const handleRemove  = (collectorid,character) => ({
    type: "REMOVE_RESTUARANT",
    payload: {collectorid: collectorid, character: character},
  });


    
  module.exports = {
    handleAdd,
    handleRemove,

  };