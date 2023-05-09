import {v4 as uuid} from 'uuid';
import axios from 'axios';
const initalState = [
  {
    id: uuid(),
    userData: null,
    selected: true,
    collections: []
  }
];

let copyState = null;
let index = 0;

const yelpReducer = (state = initalState, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'COLLECT_RESTAURANT':
      // restaurant
      const copyState = [...state];
      console.log('payload', payload);
      console.log("REDUCERS COLLECTING CHARACTER")
    //  can not collect more than 10
    const collectorId = payload.collectorid.id;
    const collectorIndex = state.findIndex(collector => collector.id === collectorId);
    if (collectorIndex === -1) {
      return state; // Collector not found, return the original state
    }
    const collector = state[collectorIndex];
    console.log("Before collections")
    if (collector.collections){
      if ( collector.collections && collector.collections.length >= 10) {
        return state; // Can't collect more than 10 characters, return the original state
      }
    }
    console.log("Confirm");
    
    const updatedCollector = {
      ...collector,
      collections: [...collector.collections, payload.character]
    };
    // console.log(updatedCollector);
    return [
      ...state.slice(0, collectorIndex),
      updatedCollector,
      ...state.slice(collectorIndex + 1)
    ];
    case 'REMOVE_RESTUARANT':
      console.log("Remove_itme Payload")
      console.log(payload)
  const giveUpState = [...state];
  const collectorIndexG = giveUpState.findIndex(collector => collector.id === payload.collectorid.id);
  if (collectorIndexG === -1) {
    return state;
  }
  const collectorG = giveUpState[collectorIndexG];
  const updatedCollectionsG = collectorG.collections.filter(character => character.id !== payload.character.id);
  const updatedCollectorG = {
    ...collectorG,
    collections: updatedCollectionsG,
  };
  giveUpState.splice(collectorIndexG, 1, updatedCollectorG);
  console.log(giveUpState[0].collections);
  axios.post('/profile/collections', giveUpState[0].collections);
  // console.log("help");
  return giveUpState;

  case 'SET_USER_DATA':
    console.log("Set-User")
    console.log(payload)
      return state.map(collector => {
        if (collector.id === payload._id) {
          return collector;
        }
        return {
          ...collector,
          id: payload._id,
          userData: payload,
          selected: true,
          collections: payload.itinerary
        };
      });
    default:
      return state;
  }
};

export default yelpReducer;