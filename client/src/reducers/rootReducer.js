import {combineReducers} from '@reduxjs/toolkit';
import yelpReducer from './yelpReducer';
const rootReducer = combineReducers({
  yelp: yelpReducer,
});

export default rootReducer;