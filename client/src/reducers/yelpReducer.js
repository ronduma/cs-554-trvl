import {v4 as uuid} from 'uuid';

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
  return giveUpState;



  case 'SET_USER_DATA':
    console.log("Set-User")
    console.log(payload)
      return state.map(collector => {
        if (collector.id !== payload.collectorid.id) {
          return collector;
        }
        return {
          ...collector,
          userData: payload.userData,
        };
      });
      // collect entire itinerary
      case 'COLLECT_ITINERARY': {
        const collectorId = payload.collectorId;
        const itineraryIds = payload.itineraryIds;
  
        // Find the collector by ID
        const collector = state.find(collector => collector.id === collectorId);
  
        if (!collector) {
          return state; // Collector not found, return the original state
        }
  
        // Collect the itinerary IDs
        const updatedCollector = {
          ...collector,
          collections: [...collector.collections, ...itineraryIds],
        };
  
        // Update the state with the new collector
        return state.map(collector => {
          if (collector.id === collectorId) {
            return updatedCollector;
          } else {
            return collector;
          }
        });
      }
      case 'COLLECT_ITINERARY': {
      const collectorId = payload.collectorId;
      const itineraryIds = payload.itineraryIds;

      // Find the collector by ID
      const collector = state.find(collector => collector.id === collectorId);

      if (!collector) {
        return state; // Collector not found, return the original state
      }

      // Collect the itinerary IDs
      const updatedCollector = {
        ...collector,
        collections: [...collector.collections, ...itineraryIds],
      };

      // Update the state with the new collector
      return state.map(collector => {
        if (collector.id === collectorId) {
          return updatedCollector;
        } else {
          return collector;
        }
      });
    }
    case 'REMOVE_ITINERARY': {
      const collectorId = payload.collectorId;
      const itineraryId = payload.itineraryId;

      // Find the collector by ID
      const collector = state.find(collector => collector.id === collectorId);

      if (!collector) {
        return state; // Collector not found, return the original state
      }

      // Remove the itinerary ID from the collections
      const updatedCollections = collector.collections.filter(id => id !== itineraryId);

      const updatedCollector = {
        ...collector,
        collections: updatedCollections,
      };

      // Update the state with the new collector
      return state.map(collector => {
        if (collector.id === collectorId) {
          return updatedCollector;
        } else {
          return collector;
        }
      });
    }
    default:
      return state;
  }
};

export default yelpReducer;