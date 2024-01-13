import { PlaybackState, PlayerState, Playlist } from "@/types";

// onStateChange: audio state가 played -> paused 되거나 paused -> played가 될 때마다 함수를 호출하고, 
// 새로운 play state를 argument로 전달받음

// 상황에 따라 음악을 재생하거나 멈추는 함수
export const createAudioPlayer = (
    playlist: Playlist, 
    onStateChange: (state: PlayerState) => void
  ) => {

  /* === play state === */
  const emitCurrentPlayerState = () => {
    const state = computeCurrentPlayerState();
    onStateChange(state);
  }

  // 현재 audio player의 state를 fetch하는 함수
  const getPlayBackState = () : PlaybackState => {
    // 현재 audio가 재생 중인 상태면 playing, 아니면 paused 문자열 반환
    return audioElement.paused ? 'PAUSED' : 'PLAYING';
  }
  const computeCurrentPlayerState = () : PlayerState => {
    return {
      playbackState: getPlayBackState()
    }
  }

  /* === Event Listener === */
  // audio player를 재생하거나 멈출 때마다 emitCurrentPlayerState함수 호출해서 state 변경
  const setupAudioElementListeners = () => {
    audioElement.addEventListener('playing', emitCurrentPlayerState);
    audioElement.addEventListener('pause', emitCurrentPlayerState);
  }

  // 현재 재생중인 곡의 index
  let currentTrackIndex = 0;
  const audioElement : HTMLAudioElement = new Audio();

  // track handling
  const loadTrack = (index:number) => {
    audioElement.src = playlist[index].audioSrc;
    audioElement.load();
    currentTrackIndex = index;
  }

  const init = () => {
    setupAudioElementListeners();
    loadTrack(0);
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

  init();

  return togglePlayPause;
}

