import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleWare, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import App from './App';

const store = createStore()

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

