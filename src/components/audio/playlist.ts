import trackOne from '../../../public/assets/songs/track1.mp3';
import trackTwo from '../../../public/assets/songs/track2.mp3';
import trackThree from '../../../public/assets/songs/track3.mp3';
import trackFour from '../../../public/assets/songs/track4.mp3';
import coverArtOne from '../../../public/assets/images/cover-art01.jpg';
import coverArtTwo from '../../../public/assets/images/cover-art02.jpg';
import coverArtThree from '../../../public/assets/images/cover-art03.jpg';
import coverArtFour from '../../../public/assets/images/cover-art04.jpg';
import { Playlist } from '../../types';

const playlist: Playlist = [
  {
    audioSrc: trackOne,
    metadata: {
      title: 'Guitar I',
      singer: 'John Doe',
      coverArtSrc: coverArtOne,
    },
  },
  {
    audioSrc: trackTwo,
    metadata: {
      title: 'Guitar II',
      singer: 'John Doe',
      coverArtSrc: coverArtTwo,
    },
  },
  {
    audioSrc: trackThree,
    metadata: {
      title: 'Sunflower',
      singer: 'Jane Doe',
      coverArtSrc: coverArtThree,
    },
  },
  {
    audioSrc: trackFour,
    metadata: {
      title: 'Flowers',
      singer: 'Jane Doe',
      coverArtSrc: coverArtFour,
    },
  },
];

export default playlist;

