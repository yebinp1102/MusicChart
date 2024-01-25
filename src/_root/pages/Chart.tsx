import SongInfoCard from "@/components/shared/SongInfoCard"
import { useState } from "react"

const Chart = () => {
  // max : 1150px
  const [sliderPosition, setSliderPosition] = useState<number>(0);

  const handleLeft = (e:React.MouseEvent<HTMLImageElement>) => {
    const newPosition = (sliderPosition - 400) <= 0 ? 0 : (sliderPosition - 400);
    setSliderPosition(newPosition);
    console.log(sliderPosition);
  }

  const handleRight = (e:React.MouseEvent<HTMLImageElement>) => {
    const newPosition = (sliderPosition + 400) >= 1150 ? 1150 : (sliderPosition + 400);
    setSliderPosition(newPosition);
    console.log(sliderPosition);

  }

  return (
    <div className="flex flex-col max-w-6xl items-center justify-center lg:h-screen w-full bg-light-4 mx-auto mb-20">
      
      <div className="relative w-full h-[280px]">
        <div className={`absolute top-0 -translate-x-[${sliderPosition}px] trans flex px-10 gap-10`}>
          <SongInfoCard />
          <SongInfoCard />
          <SongInfoCard />
          <SongInfoCard />
          <SongInfoCard />
          <SongInfoCard />
        </div>

        <div className="slider_btn_wrap">
          <img 
            src="/assets/icons/arrowLeft.svg"
            alt="slider_button"
            className="-left-5"
            onClick={handleLeft}
          />
          <img 
            src="/assets/icons/arrowRight.svg"
            alt="slider_button"
            className="-right-5"
            onClick={handleRight}
          />
        </div>
      </div>

    </div>
  )
}

export default Chart