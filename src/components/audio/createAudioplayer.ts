/* eslint-disable @typescript-eslint/no-floating-promises */
import { Controls, PlaybackState, PlayerState, Playlist, TrackMetadata } from "@/types";

export const createAudioPlayer = (playlist: Playlist, onStateChange: (state: PlayerState) => void): Controls => {
  // 현재 재생중인 곡의 index
  let currentTrackIndex = 0;
  const audioElement : HTMLAudioElement = new Audio();
  let repeat = false; // repeat mode가 활성화 되어있는지 아닌지 나타냄
  let shuffle = false; // shuffle mode가 활성화 되어있는지 아닌지 나타냄
  const playbackHistory: Array<number> = []; // 배열은 이전에 재생된 곡의 인덱스를 담고 있음.

  /* === player state 재생 상태 조작 === */
  // #region

  // audio 요소에 이벤트가 발생할 때마다 오디오 상태를 새 상태로 업데이트하는 함수.
  const emitCurrentPlayerState = () => {
    const state = computeCurrentPlayerState();
    onStateChange(state);
  }

  // 현재 오디오 전체 상태를 계산해서 반환. (재생 중인지, 트랙 정보는 무엇인지, 셔플이나 반복 재생을 켰는지 등)
  const computeCurrentPlayerState = () : PlayerState => {
    return {
      currentTrackDuration: getCurrentTrackDuration(),
      currentTrackPlaybackPosition: getCurrentTrackPlaybackPosition(),
      currentTrackMetadata: getCurrentTrackMetadata(),
      playbackState: getPlaybackState(),
      repeat,
      shuffle,
    }
  }

  // 오디오의 총 길이(총 몇 초인지)를 구하는 함수
  // 페이지를 처음 렌더링 하면 어떤 track도 load 되지 않기 때문에 duration을 참조해도 숫자값을 얻을 수 없다.
  const getCurrentTrackDuration = () : number | null => {
    // 처음 페이지를 렌더링했을 때, audioElement는 null이기 때문에 duration 값도 없다.
    return isNaN(audioElement.duration) ? null : audioElement.duration;
  }

  // track이 재생된 총 시간을 구하는 함수
  // 로직은 getCurrentTrackDuration과 같다
  const getCurrentTrackPlaybackPosition = () : number | null => {
    // 처음 페이지를 렌더링했을 때, audioElement는 null이기 때문에 currentTime 값도 없다.
    return isNaN(audioElement.currentTime) ? null : audioElement.currentTime;
  }

  // 현재 track의 정보를 index로 접근해서 가져오는 함수
  const getCurrentTrackMetadata = ():TrackMetadata | null => {
    if(currentTrackIndex < playlist.length){
      return playlist[currentTrackIndex].metadata;
    }else{
      return null;
    }
  }

  // 현재 audio player가 현재 재생 중인지 멈춤 상태인지 계산하는 함수
  const getPlaybackState = () : PlaybackState => {
    // 현재 audio가 정지 상태(paused)면 PAUSED, 아니면 PLAYING 반환
    return audioElement.paused ? 'PAUSED' : 'PLAYING';
  }

  // #endregion

  /* === Event Listener === */
  // #region
  
  // 오디오 상태가 변경될 때마다 emitCurrentPlayerState가 이벤트 핸들러로 동작해서, audio state를 업데이트함
  const setupAudioElementListeners = () => {
    audioElement.addEventListener('playing', emitCurrentPlayerState);
    audioElement.addEventListener('pause', emitCurrentPlayerState);
    audioElement.addEventListener('ended', onCurrentTrackEnded);
    audioElement.addEventListener('timeupdate', emitCurrentPlayerState);
    audioElement.addEventListener('loadeddata', emitCurrentPlayerState);
  }

  const removeAudioElementListeners = () => {
    audioElement.removeEventListener('playing', emitCurrentPlayerState);
    audioElement.removeEventListener('pause', emitCurrentPlayerState);
    audioElement.removeEventListener('ended', onCurrentTrackEnded);
    audioElement.removeEventListener('timeupdate', emitCurrentPlayerState);
    audioElement.removeEventListener('loadeddata', emitCurrentPlayerState);
  }

  // 현재 트랙의 곡이 끝나면 호출될 함수
  // repeat 모드가 활성화 된 경우 현재 track을 다시 재생. 비활성화인 경우엔 다음 곡 재생
  const onCurrentTrackEnded = () => {
    if(repeat){
      replayCurrentTrack();
    }else{
      playNextTrack();
    }
  }

  // #endregion


  /* === Track handling 트랙 조작 === */
  // #region

  // 재생 중인 혹은 재생 할 곡을 playlist의 index 번호로 접근
  const loadTrack = (index:number) => { 
    audioElement.src = playlist[index].audioSrc;
    audioElement.load();
    currentTrackIndex = index;
  }

  // repeat 모드가 활성화 된 상태에서 현재 트랙의 곡이 끝나면 트랙을 다시 재생하기 위해 호출되는 함수
  const replayCurrentTrack = () => {
    audioElement.currentTime = 0;
    audioElement.play();
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

    // 현재 재생 중(currentTrackIndex에 해당하는)인 곡은 skip해야 하기 때문에 조건문 작성
    return index < currentTrackIndex ? index : index + 1;
  }

  // #endregion


  /* === init, clean up 초기화 정리 === */
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


    /* === Controls 오디오 조작 기능 === */
  // #region

  const setPlaybackPosition = (position: number) => {
    if(isNaN(position)) return;
    audioElement.currentTime = position;
  }

  // 반복 모드 toggle
  const toggleRepeat = () => {
    repeat = !repeat; 
    // repeat값이 변경되면 업데이트된 repeat을 참조할 수 있도록 하기 위해 emitCurrentPlayerState 호출
    emitCurrentPlayerState();
  }

  // 오디오 재생 & 정지
  const togglePlayPause = () => {
    if(audioElement.paused){ 
      // 음악이 정지된 상태에서 버튼 누르면 음악을 재생
      audioElement.play(); 
    }else{
      // 음악을 재생한 상태에서 버튼 클릭시 음악 멈춤
      audioElement.pause();
    }
  }

  // 랜덤 재생 모드 toggle
  const toggleShuffle = () => {
    shuffle = !shuffle;
    // shuffle 값이 변경되면 업데이트된 shuffle을 참조할 수 있도록 하기 위해 emitCurrentPlayerState 호출
    emitCurrentPlayerState();
  }

  // 다음 곡 재생
  const playNextTrack = () => {
    playbackHistory.push(currentTrackIndex); // 완곡하면 history에 해당 track의 인덱스 번호 push
    const nextTrackIndex = computeNextTrackIndex(); // 다음 재생할 track index 계산
    loadTrack(nextTrackIndex); // 다음 재생할 track load
    audioElement.play();
  }

  // 이전 곡 재생
  const playPrevTrack = () => {
    // history가 비어있거나, track을 재생한지 5초 이상 지난 상태에서 이전 곡 재생 하게 될 경우. 같은 곡 다시 재생
    if(playbackHistory.length === 0 || audioElement.currentTime > 5){
      replayCurrentTrack();
    }else{
      const previousTrackIndex = playbackHistory.pop(); // history에서 track index 제거
      loadTrack(previousTrackIndex!); // 이전곡으로 load
      audioElement.play();
    }
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

