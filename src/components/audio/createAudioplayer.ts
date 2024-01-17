import { Controls, PlaybackState, PlayerState, Playlist, TrackMetadata } from "@/types";

// onStateChange: audio state가 played -> paused 되거나 paused -> played가 될 때마다 함수를 호출하고, 
// 새로운 play state를 argument로 전달받음

type Props = {
  playlist: Playlist, 
  onStateChange: (state: PlayerState) => void
}

// 상황에 따라 음악을 재생하거나 멈추는 함수
export const createAudioPlayer = ({playlist, onStateChange}: Props): Controls => {
  // 현재 재생중인 곡의 index
  let currentTrackIndex = 0;
  const audioElement : HTMLAudioElement = new Audio();
  let repeat = false; // repeat mode가 활성화 되어있는지 아닌지 나타냄
  let shuffle = false; // shuffle mode가 활성화 되어있는지 아닌지 나타냄
  const playbackHistory: Array<number> = []; // 배열은 이전에 재생된 곡의 인덱스를 담고 있음.

  /* === play state === */
  // #region
  const emitCurrentPlayerState = () => {
    const state = computeCurrentPlayerState();
    onStateChange(state);
  }

  const computeCurrentPlayerState = () : PlayerState => {
    return {
      currentTrackDuration: getCurrentTrackDuration(),
      currentTrackPlaybackPosition: getCurrentTrackPlaybackPosition(),
      currentTrackMetadata: getCurrentTrackMetadata(),
      playbackState: getPlayBackState(),
      repeat,
      shuffle,
    }
  }

  const getCurrentTrackDuration = () : number | null => {
    // 처음 페이지를 렌더링했을 때, audioElement는 null이기 때문에 duration 값도 없다.
    return isNaN(audioElement.duration) ? null : audioElement.duration;
  }

  const getCurrentTrackPlaybackPosition = () : number | null => {
    // 처음 페이지를 렌더링했을 때, audioElement는 null이기 때문에 currentTime 값도 없다.
    return isNaN(audioElement.currentTime) ? null : audioElement.currentTime;
  }

  const getCurrentTrackMetadata = ():TrackMetadata | null => {
    if(currentTrackIndex < playlist.length){
      return playlist[currentTrackIndex].metadata;
    }else{
      return null;
    }
  }

  // 현재 audio player의 state를 fetch하는 함수
  const getPlayBackState = () : PlaybackState => {
    // 현재 audio가 재생 중인 상태면 playing, 아니면 paused 문자열 반환
    return audioElement.paused ? 'PAUSED' : 'PLAYING';
  }

  // #endregion

  /* === Event Listener === */
  // #region
  
  // audio player를 재생하거나 멈출 때마다 emitCurrentPlayerState함수 호출해서 state 변경
  const setupAudioElementListeners = () => {
    audioElement.addEventListener('playing', emitCurrentPlayerState);
    audioElement.addEventListener('pause', emitCurrentPlayerState);
    audioElement.addEventListener('ended', onCurrentTrackEnded);
    audioElement.addEventListener('timeupdate', emitCurrentPlayerState);
    audioElement.addEventListener("loadeddata", emitCurrentPlayerState);
  }

  const removeAudioElementListeners = () => {
    audioElement.removeEventListener('playing', emitCurrentPlayerState);
    audioElement.removeEventListener('pause', emitCurrentPlayerState);
    audioElement.removeEventListener('ended', onCurrentTrackEnded);
    audioElement.removeEventListener('timeupdate', emitCurrentPlayerState);
    audioElement.removeEventListener("loadeddata", emitCurrentPlayerState);
  }

  // 현재 트랙의 곡이 끝나면 호출될 함수
  const onCurrentTrackEnded = () => {
    if(repeat){
      // repeat 모드가 활성화 된 경우 track을 replay하도록
      replayCurrentTrack();
    }else{
      // repeat 모드가 활성화 X인 경우 다음 트랙 재생
      playNextTrack();
    }
  }

  // #endregion


  /* === Track handling === */
  // #region

  // repeat 모드가 활성화 된 상태에서 현재 트랙의 곡이 끝나면 트랙을 다시 재생하기 위해 호출되는 함수
  const replayCurrentTrack = () => {
    audioElement.currentTime = 0;
    audioElement.play();
  }

  // 현재 재생 중인 곡을 index로 접근해서 fetch
  const loadTrack = (index:number) => { 
    audioElement.src = playlist[index].audioSrc;
    audioElement.load();
    currentTrackIndex = index;
  }

  const computeNextTrackIndex = () : number => {
    return shuffle ? computeRandomTrackIndex() : computeSubsequentTrackIndex();
  }

  const computeSubsequentTrackIndex = () : number => {
    // currentTrackIndex의 다음 곡을 재생 할 때, 해당 곡의 index로 곡 정보에 접근하는데
    // 이때 index값이 playlist.length보다 크면 playlist의 0번 인덱스로 돌아가야 하므로 %
    return (currentTrackIndex + 1) % playlist.length;
  }

  // 새 트랙의 인덱스를 계산하는 함수
  const computeRandomTrackIndex = () :number => {
    if(playlist.length === 1) return 0;
    const index = Math.floor(Math.random() * (playlist.length -1));

    // 항상 현재 재생중인 곡은 skip해야 하기 때문에 조건문 작성
    return index < currentTrackIndex ? index : index + 1;
  }

  // #endregion


  /* === init & clean up === */
  // #region

  // audio 곡 정보의 초기값 설정
  const init = () => {
    setupAudioElementListeners();
    loadTrack(0);
  }

  const cleanup = () => {
    removeAudioElementListeners();
    audioElement.pause();
  }

  // #endregion


    /* === Controls === */
  // #region

  const setPlaybackPosition = (position: number) => {
    if(isNaN(position)) return;
    audioElement.currentTime = position;
  }

  const toggleRepeat = () => {
    repeat = !repeat; 
    // repeat값이 변경되면 업데이트된 repeat을 참조할 수 있도록 하기 위해 emitCurrentPlayerState 호출
    emitCurrentPlayerState();
  }

  // 현재 음악의 재생 여부에 따라서 처리하는 동작이 달라짐
  const togglePlayPause = () => {
    if(audioElement.paused){ 
      // 음악이 정지된 상태에서 버튼 누르면 음악을 재생
      audioElement.play(); 
    }else{
      // 음악을 재생한 상태에서 버튼 클릭시 음악 멈춤
      audioElement.pause();
    }
  }

  const toggleShuffle = () => {
    shuffle = !shuffle;
    // shuffle 값이 변경되면 업데이트된 shuffle을 참조할 수 있도록 하기 위해 emitCurrentPlayerState 호출
    emitCurrentPlayerState();
  }

  // Next(다음) 버튼 누르면 currentTrackIndex 업데이트 하고 그에 맞는 곡 정보 불러와서 재생
  const playNextTrack = () => {
    playbackHistory.push(currentTrackIndex); // 완곡하면 기록에 해당 곡 인덱스 번호 push
    const nextTrackIndex = computeNextTrackIndex();
    loadTrack(nextTrackIndex);
    audioElement.play();
  }

  // Prev(이전) 버튼 누르면 currentTrackIndex 업데이트 하고 그에 맞는 곡 정보 불러와서 재생
  const playPrevTrack = () => {
    if(playbackHistory.length === 0 || audioElement.currentTime > 5){
      replayCurrentTrack();
    }else{
      const previousTrackIndex = playbackHistory.pop();
      loadTrack(previousTrackIndex!);
      audioElement.play();
    }


    // const nextTrackIndex = currentTrackIndex - 1;
    // loadTrack(nextTrackIndex);
    // audioElement.play();
  }

  // #endregion

  init();

  return {
    setPlaybackPosition,
    toggleRepeat,
    togglePlayPause,
    toggleShuffle,
    playNextTrack,
    playPrevTrack,
    cleanup,
  };
}

