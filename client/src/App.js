import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from './components/Generic/Header';
import Events from './components/Events/Events';
import CreateEvent from './components/Events/CreateEvent';
import UpdateEvent from './components/Events/UpdateEvent';
import Home from './components/Generic/Home';
import Login from './components/Generic/Login';
import Registration from './components/Generic/Registration';


const queryClient = new QueryClient();

const App = () => {
  //useDispatch is a new hook that replaced mapDispatchToProps. The Question, however, is how can we write a 
  //test for it. Is it possible? Check it out later for sure!!!)
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className='App'>
          <Header />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/events' component={Events} />
            <Route path='/events/create' component={CreateEvent} />
            <Route exact path='/events/update/:id' component={UpdateEvent} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/registration' component={Registration} />
          </Switch>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

// 