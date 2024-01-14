import playButtonIcon from '../../../public/assets/icons/ic_play.svg'
import pauseButtonIcon from '../../../public/assets/icons/ic_pause.svg'
import nextButtonIcon from '../../../public/assets/icons/ic_next.svg'
import prevButtonIcon from '../../../public/assets/icons/ic_prev.svg'
import shuffleButtonIcon from '../../../public/assets/icons/ic_shuffle.svg'
import repeatButtonIcon from '../../../public/assets/icons/ic_repeat.svg'
import repeatButtonDisabledIcon from '../../../public/assets/icons/ic_repeat_disabled.svg'


type Props = {
  onPlayClick: () => void;
  onPrevClick: () => void;
  onNextClick: () => void;
  onRepeatClick: () => void;
  isPlaying : boolean;
  repeat: boolean
}

const Controls = ({onPlayClick, isPlaying, onPrevClick, onNextClick, onRepeatClick, repeat} : Props) => {

  const onClick = () => {

  }

  return (
    <div className="flex border-r border-light-4 pr-4">
      <ImageButton 
        src={shuffleButtonIcon} 
        onClick={onClick}
      />
      <ImageButton 
        src={prevButtonIcon} 
        onClick={onPrevClick}
      />
      <ImageButton 
        src={isPlaying ? pauseButtonIcon : playButtonIcon} 
        onClick={onPlayClick}
        className='mx-2'
        buttonSize={32}
      />
      <ImageButton 
        src={nextButtonIcon} 
        onClick={onNextClick}
      />
      <ImageButton 
        src={repeat ? repeatButtonIcon : repeatButtonDisabledIcon} 
        onClick={onRepeatClick}
      />
    </div>
  )
}

export default Controls

type ImageButtonProps = {
  src: string; // img button에 사용할 icon
  onClick: () => void;
  className?: string;
  buttonSize?: number;
}

const ImageButton = ({src, onClick, className, buttonSize= 40} :ImageButtonProps) => {
  return (
    <button onClick={onClick}>
      <img 
        src={src}
        width={buttonSize}
        height={buttonSize}
        // className ?? '' 는 className ? className : ''과 같은 표현
        className={`drop-shadow-lg ${className ?? ''}`}
      />
    </button>
  )
}