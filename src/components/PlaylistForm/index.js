import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addTracksToPlaylist, createPlaylist } from '../../lib/fetchApi';
//import Button from '../Button';
import Input from '../Input';
import InputGroup from '../InputGroup';
import './index.css';
import PropTypes from 'prop-types';
import { logout } from '../../TokenSlice/index';
import { Button } from '@chakra-ui/react';

function PlaylistForm({ uriTracks }) {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const userId = useSelector((state) => state.auth.user.id);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    title: '',
    description: '',
  });

  const [errorForm, setErrorForm] = useState({
    title: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrorForm({ ...errorForm, [name]: '' });
  }

  const validateForm = () => {
    let isValid = true;
    if (form.title.length < 5) {
      setErrorForm({
        ...errorForm,
        title: 'Title must be at least 5 characters long',
      });
      isValid = false;
    }

    if (form.description.length > 100) {
      setErrorForm({
        ...errorForm,
        description: 'Description must be less than 100 characters long',
      });
      isValid = false;
    }

    return isValid;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (uriTracks.length > 0) {
        try {
          const responseCreatePlaylist = await createPlaylist(accessToken, userId, {
            name: form.title,
            description: form.description,
          });
          await addTracksToPlaylist(accessToken, responseCreatePlaylist.id, uriTracks);
          toast.success('Create playlist successfully');
          setForm({ title: 'jnefesj', description: '' });
        } catch (error) {
          if (error.response.status === 401) {
            dispatch(logout());
          } else {
            toast.error(error.message);
          }
        }
      } else {
        toast.error('Select at least one track');
      }
    }
  }

  return (
    <div className='createPlaylistForm'>
      <div>
        <h2>Create Playlist</h2>
        <form className='formPlaylist' onSubmit={handleSubmit}>
          <InputGroup>
            <Input
              label='Title'
              value={form.title}
              id='playlistTitle'
              name='title'
              onChange={handleChange}
              error={errorForm.title}
              data-testid='playlistTitle'
            />
          </InputGroup>
          <InputGroup>
            <Input
              type='textarea'
              label='Description'
              value={form.description}
              id='playlistDescription'
              name='description'
              onChange={handleChange}
              error={errorForm.description}
              data-testid='playlistDescription'
            />
          </InputGroup>
          <div className='playlistAction'>
            <Button type='submit' ml='5' mb='3' width='90%' colorScheme='green' variant='solid' style={{ borderRadius: 8 }} data-testid='btn-create-playlist'>Create</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

PlaylistForm.propTypes = {
  uriTracks: PropTypes.array.isRequired,
};


export default PlaylistForm;