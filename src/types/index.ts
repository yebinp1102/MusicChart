export type NewUserType = {
  name: string;
  email: string;
  password: string;
}

export type UserType = {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  isAdmin: boolean;
}


export type NavLinkType = {
  imgUrl: string;
  route: string;
  label: string;
}

export type NewSongType = {
  singer: string;
  title: string;
  file: File[];
  tags?: string;
}

export type UpdateSongType = {
  songId: string;
  imageId: string;
  imageUrl: URL;
  singer: string;
  title: string;
  file: File[];
  tags?: string;
}


// playlist & track
export type Playlist = Array<Track>;

export type Track = {
  audioSrc: string;
  metadata: TrackMetadata;
}

export type TrackMetadata = {
  singer: string;
  title: string;
  coverArtSrc: string;
}

// audio controls
export type Controls = {
  togglePlayPause: () => void;
  toggleShuffle: () => void;
  playNextTrack: () => void;
  playPrevTrack: () => void;
  cleanup: () => void;
  toggleRepeat: () => void;
};

// audio player state
export type PlayerState = {
  playbackState: PlaybackState;
  repeat: boolean; // repeat mode 중이면 true, 아니면 false
  shuffle: boolean;
}

export type PlaybackState = 'PLAYING' | 'PAUSED';

export const InitialPlayerState: PlayerState = {
  playbackState: 'PAUSED', // 사용자가 브라우저 열었을 때는 audio player state를 puased로 디폴트
  repeat: false,
  shuffle: false,
}