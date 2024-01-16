import useAudioPlayer from '@/hooks/useAudioPlayer';
import ProgressBar from './ProgressBar';
import playlist from './playlist';

const SongInfo = () => {
  const {playerState} = useAudioPlayer(playlist);
  const {currentTrackMetadata} = playerState;

  return (
    <div className="flex items-center overflow-hidden pl-4 flex-1">
      {/* img */}
      <img 
        src={currentTrackMetadata?.coverArtSrc}
        alt="song_cover_img" 
        className="rounded-sm w-[55px] h-[55px] object-cover"
      />
      {/* title, singer */}
      <div className="flex flex-col w-full px-4">
        <div className="flex items-center gap-3 mb-[5px]">
          <p className='text-[0.9rem]'>{currentTrackMetadata?.title}</p>
          <p className="text-[0.75rem] text-light-3">{currentTrackMetadata?.singer}</p>
        </div>
        <ProgressBar />
      </div>
    </div>
  )
}

export default SongInfo;
