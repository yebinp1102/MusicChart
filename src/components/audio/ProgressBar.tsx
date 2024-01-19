
type Props = {
  currentTrackDuration: number | null;
  currentTrackPlaybackPosition: number | null;
  setPlaybackPosition: (position: number) => void;
}

const ProgressBar = ({currentTrackDuration, currentTrackPlaybackPosition, setPlaybackPosition} : Props) => {

  const setProgress = (value: number) => {
    // event 발생할 때 playback position chage
    if(currentTrackDuration !== null){
      setPlaybackPosition((value / 100) * currentTrackDuration);
    }
  }

  const computeProgress = () : number => {
    // noProgress는 진행 상황이 있는지에 대해 불리언 값을 반환. 
    // 만약 아래 3개의 조건문 중 하나라도 해당되면 진행 상태가 없다는 뜻이므로 결과적으로 0을 반환
    const noProgress = 
      currentTrackDuration === null || 
      currentTrackPlaybackPosition === null || 
      currentTrackDuration === 0
    if(noProgress) return 0;
    else return (currentTrackPlaybackPosition / currentTrackDuration) * 100;
  }
  return (
    <div className="w-full flex flex-col gap-[5px]">
      <input 
        type="range"
        min="1"
        max="100"
        value={computeProgress()}
        step="0.25"
        className="slider"
        onChange={(event) => setProgress(parseInt(event?.target.value))}
      />
      <div className="flex w-full justify-between">
        <span className="text-xs">{formatTime(currentTrackPlaybackPosition)}</span>
        <span className="text-xs">{formatTime(currentTrackDuration)}</span>
      </div>
    </div>
  )
}

export default ProgressBar;

function formatTime(timeInSec : number | null) : string {
  if(timeInSec === null) return '';
  const numberOfMin = Math.floor(timeInSec/60);
  const numberOfSec = Math.floor(timeInSec - numberOfMin * 60);
  const minutes = `${numberOfMin}`.padStart(2, '0');
  const seconds = `${numberOfSec}`.padStart(2, '0');
  return `${minutes} : ${seconds}`;
}

// currentTrackPlaybackPosition : 재생 진행률
// currentTrackDuration : 트랙 전체 길이