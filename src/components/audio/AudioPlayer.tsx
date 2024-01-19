import SongInfo from "./SongInfo"
import Controls from "./Controls"
import useAudioPlayer from "@/hooks/useAudioPlayer"
import playlist from "./playlist"

const AudioPlayer = () => {
  const {playerState, playNextTrack, playPrevTrack, togglePlayPause, toggleRepeat, toggleShuffle, setPlaybackPosition} = useAudioPlayer(playlist);
  const {repeat, playbackState, shuffle, currentTrackDuration, currentTrackPlaybackPosition, currentTrackMetadata} = playerState;

  return (
    <div className="w-full z-[100] h-[90px] border-t px-10 py-2 border-primary-500">
      <div className="max-w-4xl mx-auto h-full flex">
        <Controls 
          repeat={repeat}
          shuffle={shuffle}
          onRepeatClick={toggleRepeat}
          onNextClick={playNextTrack}
          onPrevClick={playPrevTrack}
          onPlayClick={togglePlayPause}
          onShuffleClick={toggleShuffle}
          isPlaying={playbackState === 'PLAYING'} 
        />
        <SongInfo currentTrackMetadata={currentTrackMetadata} setPlaybackPosition={setPlaybackPosition} currentTrackDuration={currentTrackDuration} currentTrackPlaybackPosition={currentTrackPlaybackPosition} />
      </div>
    </div>
  )
}

export default AudioPlayer