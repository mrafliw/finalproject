import { useDispatch } from 'react-redux';
import { logout } from '../../TokenSlice/index';
import Button from '../Button';
import './index.css';
import SpotifyLogo from '../../assets/SpotifyLogo.png';

function Navbar() {
  const dispatch = useDispatch();
  return (
    <nav className='navbar'>
      <div className='navbarLogo'>
        <img src={SpotifyLogo} alt='t' />
        <p>Spotify.</p>
      </div>
      <div className='navbarMenu'>
        <Button className='btn-logout' onClick={() => dispatch(logout())}>Logout</Button>
      </div>
    </nav>
  )
}

export default Navbar;