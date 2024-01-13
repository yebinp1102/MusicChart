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

// audio player state
export type PlayerState = {
  playbackState: PlaybackState;
}

export type PlaybackState = 'PLAYING' | 'PAUSED';

export const InitialPlayerState: PlayerState = {
  playbackState: 'PAUSED', // 사용자가 브라우저 열었을 때는 audio player state를 puased로 디폴트
}