import './App.css';
import HomePage from './Container/CreatePlaylist';
import { useLocation, Switch, Route } from 'react-router-dom';
import Auth from './Container/Login';
import GuardRoute from './components/GuardRoute';
import NotFound from './Container/NotFound';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './TokenSlice/index';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const accessTokenState = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      const expiredDate = localStorage.getItem('expiredDate');

      if (expiredDate < +new Date()) {
        dispatch(logout());
      } else if (!accessTokenState) {
        const user = JSON.parse(localStorage.getItem('user'));
        dispatch(login({
          accessToken,
          user,
          expiredDate,
          }));
      }
    }
  }, [accessTokenState, dispatch, location.pathname]);
  
  return (
    <Switch>
      <GuardRoute path='/' type='guest' exact>
        <Auth />
      </GuardRoute>
      <GuardRoute path='/create-playlist' type='private' exact>
        <HomePage />
      </GuardRoute>
      <Route path='*'>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default App;
