import { useState } from 'react';
import './index.css';
import PropTypes from 'prop-types';
import {Button} from '@chakra-ui/react';

function Track({ imageUrl, title, artist, select, toggleSelect }) {
  const [isSelected, setIsSelected] = useState(select);

  const handleToggleSelect = () => {
    setIsSelected(!isSelected);
    toggleSelect();
  }

  return (
    <div className='song'>
      <div className='songImage'>
        <img src={imageUrl} alt={title} data-testid='track-img'/>
      </div>

      <div className='songData'>
          <h3 className='songTitle' data-testid='track-title'>{title}</h3>
          <p className='songArtist' data-testid='track-artist'>{artist}</p>
      </div>
      <div className='songAction'>
      <Button
        className='btn-select'
        colorScheme='green' style={{ borderRadius: 8 }}
        onClick={handleToggleSelect}
        data-testid='btn-select'
      >
        {isSelected ? 'Deselect' : 'Select'}
      </Button>
      </div>
    </div>
  );
}

Track.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  toggleSelect: PropTypes.func.isRequired,
  select: PropTypes.bool.isRequired,
};

export default Track;