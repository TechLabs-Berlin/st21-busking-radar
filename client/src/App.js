import React, { useEffect, useImperativeHandle } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from './components/Generic/Header';
import Events from './components/Events/Events';
import CreateEvent from './components/Events/CreateEvent';
import UpdateEvent from './components/Events/UpdateEvent';
import Home from './components/Generic/Home';
import Login from './components/Auth/Login';
import Registration from './components/Auth/Registration';
import { loadUser } from './actions/auth';
import PrivateRoute from './routers/PrivateRoute';
import SetUpProfile from './components/Profile/SetUpProfile';

const queryClient = new QueryClient();

const App = () => {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadUser())
  }, [])
  //useDispatch is a new hook that replaced mapDispatchToProps. The Question, however, is how can we write a 
  //test for it. Is it possible? Check it out later for sure!!!)
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className='App'>
          <Header />
          <Switch>
            <Route exact path='/' component={() => <Home auth={auth} />} />
            <Route exact path='/events' component={Events} />
            <PrivateRoute exact path='/events/create' component={() => <CreateEvent auth={auth} />} />
            <PrivateRoute exact path='/events/update/:id' component={UpdateEvent} />
            <Route exact path='/registration' component={Registration} />
            <PrivateRoute exact path='/registration/setupprofile' component={() => <SetUpProfile auth={auth} />} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

// 