import React from 'react';
import './App.css';
//We are using react-router-dom@4.2.2 with history separately
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Header from './components/Header';
import RegisterPage from './components/RegisterPage';
import Events from './components/Events/Events';
import CreateEvent from './components/Events/CreateEvent';
import UpdateEvent from './components/Events/UpdateEvent';

export const history = createBrowserHistory();

const App = () => {
  //useDispatch is a new hook that replaced mapDispatchToProps. The Question, however, is how can we write a 
  //test for it. Is it possible? Check it out later for sure!!!)
  return (
    <Router history={history}>
      <div className='App'>
        <Header />
        <Switch>
          <Route exact path='/' component={RegisterPage} />
          <Route exact path='/events' component={Events} />
          <Route exact path='/events/create' component={CreateEvent} />
          <Route exact path='/events/update/:id' component={UpdateEvent} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
