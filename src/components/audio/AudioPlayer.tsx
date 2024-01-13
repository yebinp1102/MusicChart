import SongInfo from "./SongInfo"
import { createAudioPlayer } from "./audioplayer"
import Controls from "./Controls"
import playlist from "./playlist"
import { useRef, useState } from "react"
import { InitialPlayerState, PlayerState } from "@/types"

const AudioPlayer = () => {
  const [playerState, setPlayerState] = useState<PlayerState>(InitialPlayerState);

  // createAudioPlayer(playlist) : 재생 또는 멈춤을 실행하는 함수 반환
  // togglePlayPauseRef은 컨텍스트에 따라 곡 재생 혹은 멈춤 기능을 하는 함수를 호출
  const togglePlayPauseRef = useRef(createAudioPlayer(playlist, setPlayerState));

  return (
    <div className="w-full z-[100] h-[90px] border-t px-10 py-2 border-primary-500">
      <div className="max-w-4xl mx-auto h-full flex">
        <Controls onPlayClick={togglePlayPauseRef.current} isPlaying={playerState.playbackState === 'PLAYING'} />
        <SongInfo />
      </div>
    
    </div>
  )
}

export default AudioPlayer