import { Playlist } from '@/types';

import trackOne from '../../../public/assets/songs/track1.mp3';
import trackTwo from '../../../public/assets/songs/track2.mp3';
import trackThree from '../../../public/assets/songs/track3.mp3';
import trackFour from '../../../public/assets/songs/track4.mp3';
import trackFive from '../../../public/assets/songs/track5.mp3';
import trackSix from '../../../public/assets/songs/track6.mp3';
import trackSeven from '../../../public/assets/songs/track7.mp3';
import trackEight from '../../../public/assets/songs/track8.mp3';
import trackNine from '../../../public/assets/songs/track9.mp3';
import trackTen from '../../../public/assets/songs/track10.mp3';

// cover arts
import coverArtOne from '../../../public/assets/coverArt/coverArt01.jpg';
import coverArtTwo from '../../../public/assets/coverArt/coverArt02.jpg';
import coverArtThree from '../../../public/assets/coverArt/coverArt03.jpg';
import coverArtFour from '../../../public/assets/coverArt/coverArt04.jpg';
import coverArtFive from '../../../public/assets/coverArt/coverArt05.jpg';
import coverArtSix from '../../../public/assets/coverArt/coverArt06.jpg';
import coverArtSeven from '../../../public/assets/coverArt/coverArt07.jpg';
import coverArtEight from '../../../public/assets/coverArt/coverArt08.jpeg';
import coverArtNine from '../../../public/assets/coverArt/coverArt09.jpeg';
import coverArtTen from '../../../public/assets/coverArt/coverArt10.jpeg';


const playlist: Playlist = [
  {
    audioSrc: trackTwo,
    metadata: {
      title: 'Teenage fever',
      singer: 'Jonny Orlando',
      coverArtSrc: coverArtTwo,
    },
  },
  {
    audioSrc: trackThree,
    metadata: {
      title: 'Blue neighborhood',
      singer: 'Troye sivan',
      coverArtSrc: coverArtThree,
    },
  },
  {
    audioSrc: trackFour,
    metadata: {
      title: 'Starboy',
      singer: 'The weekend',
      coverArtSrc: coverArtFour,
    },
  },
  {
    audioSrc: trackFive,
    metadata: {
      title: 'Bad Ideas',
      singer: 'Tessa Violet',
      coverArtSrc: coverArtFive,
    },
  },
  {
    audioSrc: trackSix,
    metadata: {
      title: 'Ooh ah girl',
      singer: 'xion (ft. 창모)',
      coverArtSrc: coverArtSix,
    },
  },
  {
    audioSrc: trackSeven,
    metadata: {
      title: 'Advisory',
      singer: 'Traviscott',
      coverArtSrc: coverArtSeven,
    },
  },
  {
    audioSrc: trackEight,
    metadata: {
      title: 'Invasion of Privacy',
      singer: 'Cardi B',
      coverArtSrc: coverArtEight,
    },
  },
  {
    audioSrc: trackNine,
    metadata: {
      title: 'Attention',
      singer: 'New Jeans',
      coverArtSrc: coverArtNine,
    },
  },
  {
    audioSrc: trackTen,
    metadata: {
      title: 'Fuxx the world',
      singer: 'Jane Doe',
      coverArtSrc: coverArtTen,
    },
  },
  {
    audioSrc: trackOne,
    metadata: {
      title: 'Call me by your name',
      singer: 'Luca Guadagnino',
      coverArtSrc: coverArtOne,
    },
  },
];

export default playlist;

