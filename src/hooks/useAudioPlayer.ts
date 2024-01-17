import { createAudioPlayer } from "@/components/audio/createAudioplayer";
import { Controls, InitialPlayerState, PlayerState, Playlist } from "@/types";
import { useEffect, useRef, useState } from "react";

interface AudioPlayer extends Controls {
  playerState: PlayerState;
}

// useAudioPlayer hook은 playerState와 playerRef를 저장
export default function useAudioPlayer(playlist: Playlist) : AudioPlayer {
  const [playerState, setPlayerState] = useState<PlayerState>(InitialPlayerState);

  // playerRef : 조건에 따라 곡을 재생/멈춤하거나, 이전or다음 곡 재생 기능을 하는 함수를 반환
  const playerRef = useRef<Controls | null>(null);

  // useEffect로 인해 playlist가 변경될 때마다 playerRef 업데이트 됨.
  useEffect(() => {
    const newPlayer = createAudioPlayer({playlist, onStateChange:setPlayerState})
    playerRef.current = newPlayer;

    // clean up : useEffect가 cleaned up될 때 audio player를 파괴함
    return () => {
      // audio player를 clean up
      newPlayer.cleanup();

    }
    
  }, [playlist])

  const setPlaybackPosition = (position: number) => {
    playerRef.current?.setPlaybackPosition(position)
  }


  // playerRef는 함수이거나 null일수도 있기 때문에 null인 경우는 함수를 호출해도 변화 없도록 설계
  const togglePlayPause = () => {
    // playerRef가 null인 경우 아무것도 실행되지 X
    playerRef.current?.togglePlayPause();
  }

  const toggleShuffle = () => {
    playerRef.current?.toggleShuffle();
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

  const toggleRepeat = () => {
    playerRef.current?.toggleRepeat();
  }

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