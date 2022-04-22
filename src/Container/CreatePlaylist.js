import { useEffect, useState } from 'react'
import Tracks from '../components/Tracks';
import SearchBar from '../components/SearchBar';
import { useDocumentTitle } from '../lib/customHooks';
import Layout from '../components/Layout';
import './index.css';
import PlaylistForm from '../components/PlaylistForm';

function HomePage() {
  const [tracks, setTracks] = useState([]);
  const [selectedTracksUri, setSelectedTracksUri] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [isInSearch, setIsInSearch] = useState(false);
  const [message, setMessage] = useState('No tracks');

  useDocumentTitle('HomePage - Spotify');

  useEffect(() => {
    if (!isInSearch) {
      setTracks(selectedTracks);
    }
  }, [selectedTracksUri, selectedTracks, isInSearch]);

  const onSuccessSearch = (searchTracks, query) => {
  setIsInSearch(true);
  
  const selectedSearchTracks = searchTracks.filter((track) => selectedTracksUri.includes(track.uri));
  setTracks(() => {
    const _tracks = [...new Set([...selectedSearchTracks, ...searchTracks])];
    if (_tracks.length === 0) {
      setMessage(`No tracks found with query '${query}'`);
    } else {
      setMessage('');
      }
      return _tracks;
    });
  }

  const clearSearch = () => {
    setTracks(selectedTracks);
    setMessage('No tracks');
    setIsInSearch(false);
  }

  const toggleSelect = (track) => {
    const uri = track.uri;
    if (selectedTracksUri.includes(uri)) {
      setSelectedTracksUri(selectedTracksUri.filter((item) => item !== uri));
      setSelectedTracks(selectedTracks.filter((item) => item.uri !== uri));
    } else {
      setSelectedTracksUri([...selectedTracksUri, uri]);
      setSelectedTracks([...selectedTracks, track]);
    }
  }

  return (
    <Layout>
      <main className='container' id='home'>
        <SearchBar
          onSuccess={onSuccessSearch}
          onClearSearch={clearSearch}
        />
        <hr />
        
        <PlaylistForm uriTracks={selectedTracksUri} />

        <div className='content'>
          {tracks.length === 0 && (
            <p>{message}</p>
          )}

          <div className='tracks'>
            {tracks.map((track) => (
              <Tracks
                key={track.id}
                imageUrl={track.album.images[0].url}
                title={track.name}
                artist={track.artists[0].name}
                select={selectedTracksUri.includes(track.uri)}
                toggleSelect={() => toggleSelect(track)}
              />
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
} 

export default HomePage;