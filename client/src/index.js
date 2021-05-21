import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './App';

//This is a redux store
const store = configureStore();

//Provider connects redux store to the react app
const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(
  jsx,
  document.getElementById('root')
);

