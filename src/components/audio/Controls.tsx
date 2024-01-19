import playButtonIcon from '../../../public/assets/icons/ic_play.svg'
import pauseButtonIcon from '../../../public/assets/icons/ic_pause.svg'
import nextButtonIcon from '../../../public/assets/icons/ic_next.svg'
import prevButtonIcon from '../../../public/assets/icons/ic_prev.svg'
import shuffleButtonIcon from '../../../public/assets/icons/ic_shuffle.svg'
import shuffleButtonDisabledIcon from '../../../public/assets/icons/ic_shuffle_disabled.svg'
import repeatButtonIcon from '../../../public/assets/icons/ic_repeat.svg'
import repeatButtonDisabledIcon from '../../../public/assets/icons/ic_repeat_disabled.svg'


type Props = {
  onPlayClick: () => void;
  onPrevClick: () => void;
  onNextClick: () => void;
  onRepeatClick: () => void;
  onShuffleClick: () => void;
  isPlaying : boolean;
  repeat: boolean;
  shuffle: boolean;
}

const Controls = ({onPlayClick, isPlaying, onPrevClick, onNextClick, onRepeatClick, repeat, onShuffleClick, shuffle} : Props) => {

  return (
    <div className="flex border-r border-light-4 pr-4">
      {/* shuffle btn */}
      <ImageButton 
        src={shuffle ? shuffleButtonIcon : shuffleButtonDisabledIcon} 
        onClick={onShuffleClick}
      />

      {/* skip to prev btn  */}
      <ImageButton 
        src={prevButtonIcon} 
        onClick={onPrevClick}
      />

      {/* play & pause btn */}
      <ImageButton 
        src={isPlaying ? pauseButtonIcon : playButtonIcon} 
        onClick={onPlayClick}
        className='mx-2'
        buttonSize={32}
      />

      {/* skip to next btn */}
      <ImageButton 
        src={nextButtonIcon} 
        onClick={onNextClick}
      />

      {/* repeat btn */}
      <ImageButton 
        src={repeat ? repeatButtonIcon : repeatButtonDisabledIcon} 
        onClick={onRepeatClick}
      />
    </div>
  )
}

export default Controls

type ImageButtonProps = {
  src: string; // img button에 사용할 icon의 위치
  onClick: () => void;
  className?: string;
  buttonSize?: number;
}

// Control의 각 Button UI를 반환하는 함수. ex) play, pause, repeat button ... 
const ImageButton = ({src, onClick, className, buttonSize= 40} :ImageButtonProps) => {
  return (
    <button onClick={onClick}>
      <img 
        src={src}
        width={buttonSize}
        height={buttonSize}
        className={className ?? ''} // className ?? '' 는 className ? className : ''과 같은 표현
      />
    </button>
  )
}