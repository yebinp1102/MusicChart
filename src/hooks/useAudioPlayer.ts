import { createAudioPlayer } from "@/components/audio/createAudioplayer";
import { Controls, InitialPlayerState, PlayerState, Playlist } from "@/types";
import { useEffect, useRef, useState } from "react";

interface AudioPlayer extends Controls {
  playerState: PlayerState;
}

// useAudioPlayer hook은 playerState와 playerRef를 저장
export default function useAudioPlayer(playlist: Playlist) : AudioPlayer {

  // playerState : 현재 오디오의 기능관련 상태들과 트랙의 "상태" 정보 제공
  const [playerState, setPlayerState] = useState<PlayerState>(InitialPlayerState);

  // playerRef : 오디오의 다양한 기능을 조작하는 "함수"를 저장하는 곳. useRef를 사용하면 리렌더링되도 함수를 유지해줌.
  const playerRef = useRef<Controls | null>(null);

  // playlist가 변경될 때마다 업데이트된 player의 state를 playerRef에 반영함.
  useEffect(() => {
    const newPlayer = createAudioPlayer(playlist, setPlayerState)
    playerRef.current = newPlayer;

    // 컴포넌트가 unmount 되거나 dependency가 변경 되면 audio player를 정리(clean up)
    return () => {
      newPlayer.cleanup();
    }
  }, [playlist])

  const setPlaybackPosition = (position: number) => {
    playerRef.current?.setPlaybackPosition(position)
  }


  /* ==== prevent null Error === */
  // #region
  // playerRef는 함수이거나 null 일수도 있다. null인 경우 함수를 호출하면 에러가 발생하기 때문에 이를 사전에 방지하기 위해 함수 작성
 
  const togglePlayPause = () => {
    playerRef.current?.togglePlayPause();
  }

  const toggleShuffle = () => {
    playerRef.current?.toggleShuffle();
  }

  const toggleRepeat = () => {
    playerRef.current?.toggleRepeat();
  }

  const playNextTrack = () => {
    playerRef.current?.playNextTrack();
  }

  const playPrevTrack = () => {
    playerRef.current?.playPrevTrack();
  }

  const cleanup = () => {
    playerRef.current?.cleanup();
  }

  // #endregion

  return {
    setPlaybackPosition,
    playerState,
    togglePlayPause,
    playNextTrack,
    playPrevTrack,
    cleanup,
    toggleRepeat,
    toggleShuffle
  }
}