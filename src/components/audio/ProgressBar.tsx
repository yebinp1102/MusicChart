
type Props = {
  currentTrackDuration: number | null;  // 트랙의 전체 길이
  currentTrackPlaybackPosition: number | null;   // track 재생 진행률
  setPlaybackPosition: (position: number) => void;
}

const ProgressBar = ({currentTrackDuration, currentTrackPlaybackPosition, setPlaybackPosition} : Props) => {

  // load된 track이 있을 때, track의 일부 구간을 건뛰하기 위해 호출하는 함수.
  // 더 구체적으로 audio의 currentTime에 track의 duration의 value 퍼센트에 해당하는 값을 할당함
  const setProgress = (value: number) => {
    if(currentTrackDuration !== null){
      setPlaybackPosition((value / 100) * currentTrackDuration);
    }
  }

  // 현재 track의 총 진행도(progress)를 퍼센트(숫자 0~100)로 반환하는 함수. 
  const computeProgress = () : number => {
    // noProgress는 진행 상황이 있었는지에 확인. 없으면 progress는 0부터 시작
    const noProgress = 
      currentTrackDuration === null || 
      currentTrackPlaybackPosition === null || 
      currentTrackDuration === 0
    if(noProgress) return 0;
    else return (currentTrackPlaybackPosition / currentTrackDuration) * 100;
  }

  // track position과 duration을 xx:xx 식으로 표현하는 함수
  const formatTime = (timeInSec : number | null) : string  => {
    if(timeInSec === null) return '';
    const numberOfMin = Math.floor(timeInSec/60);
    const numberOfSec = Math.floor(timeInSec - numberOfMin * 60);
    const minutes = `${numberOfMin}`.padStart(2, '0');
    const seconds = `${numberOfSec}`.padStart(2, '0');
    return `${minutes} : ${seconds}`;
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