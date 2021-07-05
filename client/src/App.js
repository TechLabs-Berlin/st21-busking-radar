import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from './components/Generic/Header';
import Events from './components/Events/Events';
import CreateEvent from './components/Events/CreateEvent';
import UpdateEvent from './components/Events/UpdateEvent';
import Home from './components/Generic/Home';
import Registration from './components/Auth/Registration';
import { loadUser } from './actions/auth';
import PrivateRoute from './routers/PrivateRoute';
import SetUpProfile from './components/Profile/SetUpProfile';
import MyProfile from './components/Profile/MyProfile';
import PageNotFound from './components/Generic/404-page';
import Buskers from './components/Buskers/Buskers';
import BuskerPage from './components/Buskers/BuskerPage';
const queryClient = new QueryClient();

const App = () => {
  const dispatch = useDispatch()
  //I should figure out a better solution later and save the user data to cookie, localstorage or session storage
  //The problem with this solution where we are constantly loading the user when the page refreshes
  //is that when the user refreshes the pages secured by the private route (for example '/profile'), 
  //he is automatically redirected to the homepage, because the redirection is hapenning first 
  //as it takes  some time to load the user and change authetication status 
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
            <Route exact path='/events' component={Events} />
            <PrivateRoute exact path='/events/create' component={CreateEvent} />
            <PrivateRoute exact path='/events/update/:id' component={UpdateEvent} />
            <Route exact path='/registration' component={Registration} />
            <PrivateRoute exact path='/profile' component={MyProfile} />
            <PrivateRoute exact path='/profile/:id' component={SetUpProfile} />
            <Route exact path='/buskers' component={Buskers} />
            <Route exact path='/busker/:id' component={BuskerPage} />
            <Route path='/' component={Home} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

// 