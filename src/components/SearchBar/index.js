import { useState } from 'react';
import {Button} from '@chakra-ui/react';
import './index.css';
import PropTypes from 'prop-types';
import Input from '../Input';
import { toast } from 'react-toastify';
import { searchTrack } from '../../lib/fetchApi.js';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../TokenSlice/index';

function SearchBar({ onSuccess, onClearSearch }) {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [text, setText] = useState('');
  const [isClear, setIsClear] = useState(true);
  const dispatch = useDispatch();

  const handleInput = (e) => {
    setText(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await searchTrack(text, accessToken);

      const tracks = response.tracks.items;
      onSuccess(tracks, text);
      setIsClear(false);
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(logout());
      } else {
        toast.error(error.message);
      }
    }
  }

  const handleClear = () => {
    onClearSearch();
    setText('');
    setIsClear(true);
  }

  return (
    <div className='Search'>
      <form className='formSearch' onSubmit={handleSubmit}>
        <Input
          type='text'
          placeholder='Search...'
          className='formSearchInput'
          required
          value={text}
          onChange={handleInput}
        />
        <Button mt='2' colorScheme='green' style={{ borderRadius: 8 }} type='submit'>Search</Button>
      </form>

      {!isClear && (
        <Button mb='2' ml='5' colorScheme='green' style={{ borderRadius: 8 }} onClick={handleClear} className='btn-clear'>Clear search</Button>
      )}
    </div>
  )
}

SearchBar.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onClearSearch: PropTypes.func.isRequired,
};

export default SearchBar;