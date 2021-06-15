import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import RegisterPage from './components/RegisterPage';
import Events from './components/Events/Events';
import CreateEvent from './components/Events/CreateEvent';
import UpdateEvent from './components/Events/UpdateEvent';
import EventInfoCard from './components/Events/EventInfoCard';

const App = () => {
  //useDispatch is a new hook that replaced mapDispatchToProps. The Question, however, is how can we write a 
  //test for it. Is it possible? Check it out later for sure!!!)
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <Switch>
          <Route exact path='/' component={RegisterPage} />
          <Route exact path='/events' component={Events} />
          <Route path='/events/create' component={CreateEvent} />
          <Route exact path='/events/update/:id' component={UpdateEvent} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

// 