import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/UserPage/User';
import { authenticate } from './store/session';
import UploadForm from './components/UploadModal/UploadForm';
import SpecificVideo from './components/SpecificVideo';
import EditVideo from './components/EditVideo';

import Homepage from './components/Homepage';
import NewVideoPage from './components/NewVideoPage';
import PopularVideoPage from './components/PopularVideoPage';
function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>

      <Switch>
        <Route path='/login' exact={true}>
          <NavBar />
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <NavBar />
          <SignUpForm />
        </Route>
        <Route path='/upload'>
          <NavBar />
          <UploadForm />
        </Route>
        <Route path='/videos/new'>
          <NavBar />
          <NewVideoPage />
        </Route>
        <Route path='/videos/popular'>
          <NavBar />
          <PopularVideoPage />
        </Route>
        <Route path='/videos/:videoId' exact={true}>
          <NavBar />
          <SpecificVideo />
        </Route>
        <Route path='/videos/:videoId/edit' exact={true}>
          <NavBar />
          <EditVideo />
        </Route>
        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute> */}
        <Route path='/users/:userId' exact={true} >
          <NavBar />
          <User />
        </Route>
        <Route path='/' exact={true} >
          <NavBar />
          <Homepage />
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
