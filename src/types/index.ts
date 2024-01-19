
/* === User type === */
// #region
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

// #endregion



export type NavLinkType = {
  imgUrl: string;
  route: string;
  label: string;
}

/* === User type === */
// #region

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

// #endregion


/* === playlist, track types === */
// #region

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

// #endregion


/* === audio controls === */
// #region
export type Controls = {
  setPlaybackPosition: (position: number) => void; // position은 progress 바의 헤드가 시작점에서 떨어진 거리(몇퍼)
  togglePlayPause: () => void;
  toggleShuffle: () => void;
  playNextTrack: () => void;
  playPrevTrack: () => void;
  cleanup: () => void;
  toggleRepeat: () => void;
};

// #endregion

/* === audio state === */
// #region
export type PlayerState = {
  currentTrackDuration : number | null;
  currentTrackPlaybackPosition: number | null; // 매초마다 progress bar의 헤드가 있어야 할 위치 
  currentTrackMetadata: TrackMetadata | null;
  playbackState: PlaybackState;
  repeat: boolean; // repeat mode 중이면 true, 아니면 false
  shuffle: boolean;
}

export type PlaybackState = 'PLAYING' | 'PAUSED';

// PlayerState의 초기 값
export const InitialPlayerState: PlayerState = {
  currentTrackDuration: null,
  currentTrackPlaybackPosition: null,
  currentTrackMetadata: null,
  playbackState: 'PAUSED', // 사용자가 브라우저 열었을 때는 곡을 재생하지 않는 것을 디폴트
  repeat: false,
  shuffle: false,
}

// #endregion