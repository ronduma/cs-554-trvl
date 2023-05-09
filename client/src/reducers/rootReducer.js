import {combineReducers} from '@reduxjs/toolkit';
import yelpReducer from './yelpReducer';
import {
  itinerary1Reducer,
  itinerary2Reducer,
  itinerary3Reducer
} from "./itineraryReducer";

const rootReducer = combineReducers({
  yelp: yelpReducer,
  itinerary: combineReducers({
    itinerary1: itinerary1Reducer,
    itinerary2: itinerary2Reducer,
    itinerary3: itinerary3Reducer
  })
});

export default rootReducer;