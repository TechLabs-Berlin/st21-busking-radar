import React, { useState } from 'react';
import './App.css';
//We are using react-router-dom@4.2.2 with history separately
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Header from './components/Header';
import RegisterPage from './components/RegisterPage';
import Events from './components/Events/Events';
import CreateEvent from './components/Events/CreateEvent';

export const history = createBrowserHistory();

const App = () => {
  return (
    <Router history={history}>
      <div className='App'>
        <Header />
        <Switch>
          <Route path='/' component={RegisterPage} />
          <Route path='/events' component={Events} />
          <Route path='/events/create' component={CreateEvent} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
