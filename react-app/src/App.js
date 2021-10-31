import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import User from './components/UserPage/User';
import { authenticate } from './store/session';
import SpecificVideo from './components/SpecificVideo';
import EditVideo from './components/EditVideo';
import Homepage from './components/Homepage';
import NewVideoPage from './components/NewVideoPage';
import PopularVideoPage from './components/PopularVideoPage';
import UploadForm from './components/UploadForm/UploadForm';
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
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/upload'>
          <NavBar />
          <UploadForm />
        </ProtectedRoute>
        <ProtectedRoute path='/videos/new'>
          <NavBar />
          <NewVideoPage />
        </ProtectedRoute>
        <ProtectedRoute path='/videos/popular'>
          <NavBar />
          <PopularVideoPage />
        </ProtectedRoute>
        <ProtectedRoute path='/videos/:videoId' exact={true}>
          <NavBar />
          <SpecificVideo />
        </ProtectedRoute>
        <ProtectedRoute path='/videos/:videoId/edit' exact={true}>
          <NavBar />
          <EditVideo />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <NavBar />
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <Homepage />
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
