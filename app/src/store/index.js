import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as reducer from './reducer';

const store = createStore(
  combineReducers(reducer),
  composeWithDevTools(applyMiddleware()),
);

export default store;
