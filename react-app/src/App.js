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
import UploadModal from './components/UploadModal';
import Homepage from './components/Homepage';
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
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/upload'>
          <UploadForm />
        </Route>
        <Route path='/videos/:videoId' exact={true}>
          <SpecificVideo />
        </Route>
        <Route path='/videos/:videoId/edit'>
          <EditVideo />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <Homepage />
        </ProtectedRoute>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
