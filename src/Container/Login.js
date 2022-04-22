import { useCallback,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../components/Button';
import { useDocumentTitle } from '../lib/customHooks';
import { getUserProfile } from '../lib/fetchApi';
import { login } from '../TokenSlice';
import LandingPage from '../assets/sportify.jpg';

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  useDocumentTitle('Login page - Spotify');

  const setLogin = useCallback(async (accessToken, expiresIn) => {
    try {
      const responseUser = await getUserProfile(accessToken);

      dispatch(login({
        accessToken,
        expiredDate: +new Date() + expiresIn * 1000,
        user: responseUser,
      }));

      history.push('/create-playlist');
    } catch (error) {
      toast.error(error.message);
    }
  }, [dispatch, history]);

  useEffect(() => {
    const accessTokenParams = new URLSearchParams(window.location.hash).get('#access_token');
    const expiresIn = new URLSearchParams(window.location.hash).get('expires_in');

    if (accessTokenParams !== null) {
      setLogin(accessTokenParams, expiresIn);
    }
  }, [setLogin]);

  const getSpotifyLogin = () => {
    const clientId = '0df8588619ce4900b978ce92b1bc9bb1';
    return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000/`;
  }

  return (
    <main className='login'>
      <div className='titleHomePage'>
        <h1>Spotify for<br/>everyone's music</h1>
        <Button className='btn-login' href={getSpotifyLogin()} external>Login</Button>
      </div>
      <div className='imageHomePage'>
        <img src={LandingPage} alt='t'/>
      </div>
    </main>
  )
} 

export default Login;