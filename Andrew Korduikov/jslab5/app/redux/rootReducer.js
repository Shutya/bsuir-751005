// Description: Root Reducer - Updated

import { combineReducers } from 'redux';

import { reducer as homeReducer } from "../modules/home"

// Combine all the reducers
const rootReducer = combineReducers({ homeReducer });

export default rootReducer;