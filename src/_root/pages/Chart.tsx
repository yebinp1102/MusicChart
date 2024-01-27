import Loader from "@/components/shared/Loader";
import SongInfoCard from "@/components/shared/SongInfoCard"
import { useGetRecentSongs } from "@/lib/react-query/queries";
import { useEffect, useState, useRef } from "react"

const Chart = () => {
  const [sliderPosition, setSliderPosition] = useState<number>(0);
  const [windowSize, setWindowSize] = useState<number | undefined>(undefined);
  const sliderContainer = useRef<HTMLDivElement | null>(null);
  const {data: songs, isPending: isSongLoading } = useGetRecentSongs();


  useEffect(() => {
    const sliderDom = sliderContainer.current;
    
    if(typeof sliderDom !== 'undefined' && sliderDom){
      const handleResize = () => {
        setWindowSize(sliderDom.offsetWidth);
      };
      
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }else{
      return () => window.removeEventListener('resize', () => null)
    }
  },[])

  const handleLeft = () => {
    if(windowSize){
      const newPosition = (sliderPosition - 250) <= 0 ? 0 : (sliderPosition - 250);
      setSliderPosition(newPosition);
    }
  } 

  if(!songs && isSongLoading){
    return (
      <>
      <Loader />로딩 중...
      </>
    )
  }

  const handleRight = () => {
    if(windowSize){
      const newPosition = (sliderPosition + 250) >= (1600 - windowSize) ? (1600 - windowSize) : (sliderPosition + 250);
      setSliderPosition(newPosition);
    }
  }

  return (
    <div className="flex flex-col max-w-6xl items-center justify-center lg:h-screen w-full bg-light-4 mx-auto mb-20">

      <div ref={sliderContainer} className="relative w-full h-[290px] overflow-x-hidden">
        <div className="slider_btn_wrap">
          <img 
            src="/assets/icons/arrowLeft.svg"
            alt="slider_button"
            className="left-2 z-[100]"
            onClick={handleLeft}
          />
          <img 
            src="/assets/icons/arrowRight.svg"
            alt="slider_button"
            className="right-2 z-[100]"
            onClick={handleRight}
          />
        </div>
        <div style={{translate: `-${sliderPosition}px`}} className={`absolute transition-all ease-in-out duration-300 top-[10px] left-0 flex px-20 gap-12`}>
          {songs?.documents.slice(0,3).map((song, idx) => (
            <SongInfoCard key={idx} subText={song.singer} title={song.title} coverArtScr={song.imageUrl} />
          ))}
          <SongInfoCard bgColor='bg-gradient-to-r from-pink-500 to-orange-500' title="Recently" subText="최근 재생된 곡 총 14개" link='/list-recently-played' />
          <SongInfoCard bgColor='bg-gradient-to-r from-blue-500 to-purple-500' title="Favorites" subText="좋아요한 곡 총 16개" />
          <SongInfoCard bgColor='bg-gradient-to-r from-green-500 to-blue-500' title="Playlist" subText="플레이리스트에 담은 곡 총 28개" link="/playlist" />
        </div>

      </div>

    </div>
  )
}

export default Chart