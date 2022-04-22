import axios from 'axios';
import config from './config';

export const searchTrack = async (query, accessToken) => {
  const requestOptions = {
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    },
  };

  const endPoint = `${config.SPOTIFY_BASE_URL}/search?type=track&q=${query}`;
  const response = await axios.get(endPoint, requestOptions);
  return response.data;
}

export const getUserProfile = async (accessToken) => {
  const requestOptions = {
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    },
  };

  const endPoint = `${config.SPOTIFY_BASE_URL}/me`;
  const response = await axios.get(endPoint, requestOptions);
  return response.data;
}

export const createPlaylist = async (accessToken, userId, { name, description }) => {
  const data = JSON.stringify({
    name,
    description,
    public: false,
    collaborative: false,
  });
  
  const requestOptions = {
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    },
  };

  const endPoint = `${config.SPOTIFY_BASE_URL}/users/${userId}/playlists`;
  const response = await axios.post(endPoint, data, requestOptions);
  return response.data;
}

export const addTracksToPlaylist = async (accessToken, playlistId, uris) => {
  const data = JSON.stringify({
    uris
  });

  const requestOptions = {
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    },
  };

  const endPoint = `${config.SPOTIFY_BASE_URL}/playlists/${playlistId}/tracks`;
  const response = await axios.post(endPoint, data, requestOptions);
  return response.data;
}