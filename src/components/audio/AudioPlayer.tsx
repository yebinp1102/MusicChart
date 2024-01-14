import SongInfo from "./SongInfo"
import { createAudioPlayer } from "./createAudioplayer.ts"
import Controls from "./Controls"
import playlist from "./playlist"
import { useRef, useState } from "react"
import { InitialPlayerState, PlayerState } from "@/types"

const AudioPlayer = () => {
  const [playerState, setPlayerState] = useState<PlayerState>(InitialPlayerState);

  // togglePlayPauseRef은 조건 혹은 상황에 따라 곡을 재생/멈춤하거나, 이전or다음 곡 재생 기능을 하는 함수를 반환
  const playerRef = useRef(createAudioPlayer({playlist, onStateChange:setPlayerState}));

  return (
    <div className="w-full z-[100] h-[90px] border-t px-10 py-2 border-primary-500">
      <div className="max-w-4xl mx-auto h-full flex">
        <Controls 
          onNextClick={playerRef.current.playNextTrack}
          onPrevClick={playerRef.current.playPrevTrack}
          onPlayClick={playerRef.current.togglePlayPause}
          isPlaying={playerState.playbackState === 'PLAYING'} 
        />
        <SongInfo />
      </div>
    </div>
  )
}

export default AudioPlayer