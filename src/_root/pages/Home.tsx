import Loader from "@/components/shared/Loader";
import SliderGridContainer from "@/components/shared/SliderGridContainer";
import { ArrowBigLeft, ArrowBigRight, Circle, CircleDot } from "lucide-react";
import SongInfoCard from "@/components/shared/SongInfoCard"
import { contentRecommendations } from "@/constants";
import { useGetRecentSongs } from "@/lib/react-query/queries";
import { useEffect, useState, useRef } from "react"

const Home = () => {
  const [sliderPosition, setSliderPosition] = useState<number>(0);
  const [windowSize, setWindowSize] = useState<number | undefined>(undefined);
  const [slideIdx, setSlideIdx] = useState<number>(0);

  const sliderContainer = useRef<HTMLDivElement | null>(null);
  const {data: songs, isPending: isSongLoading } = useGetRecentSongs();
  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formattedDate: string = currentDate.toLocaleDateString('ko-KR', options);


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
    <div className="w-full h-full mb-[180px] lg:mb-[90px] relative">

      {/* background */}
      <div className="gradient-primary-full absolute z-[-10]">
        <div className="bg-black-opacity"></div>
      </div>
            
      {/* container */}
      <div className="max-w-7xl flex flex-col gap-5 justify-between p-5 my-2 mx-auto h-full bg-white bg-opacity-10 rounded-lg">

        {/* Today - date */}
        <div>
          <div className="w-full flex items-end gap-12 border-b border-light-3 pb-4 px-2">
            <h2 className="h2-bold">For you</h2>
            <ul className="relative -bottom-4 flex gap-6">
              <li className="text-primary-500 font-bold border-b-[5px] border-primary-500 pb-4">추천 컨텐츠</li>
              <li className="text-light-2">오늘의 인기곡</li>
              <li className="text-light-2">AI 추천곡</li>
            </ul>
          </div>
          <p className="text-light-3 mt-4 pl-2">{formattedDate}</p>
        </div>

        {/* top slider : grid slider */}
        <div className="bg-white bg-opacity-5 w-full h-full px-4 py-10 rounded-lg relative">
          <div className="w-full h-full relative overflow-x-hidden">
            <div style={{translate: `${-38 * slideIdx}%`}} className="h-full flex gap-16 transition-all"> {/* 여기 translate 적용 */}
              {contentRecommendations.map(contents => (
                <SliderGridContainer contents={contents} />
              ))}
            </div>
          </div>
          {/* dot btn */}
          <div className="absolute bottom-1 w-ful z-20 flex gap-3 text-primary-500 left-[46%] px-8 py-1 rounded-xl">
            <button onClick={() => setSlideIdx(0)}>{slideIdx === 0 ? <CircleDot /> : <Circle />}</button>
            <button onClick={() => setSlideIdx(1)}>{slideIdx === 1 ? <CircleDot /> : <Circle />}</button>
            <button onClick={() => setSlideIdx(2)}>{slideIdx === 2 ? <CircleDot /> : <Circle />}</button>
          </div>
        </div>

        {/* bottom slider */}
        <div>
          <h4 className="pl-4 my-4">다른 컨텐츠 둘러보기</h4>

          <div className="flex flex-col items-center justify-center py-2 w-full bg-white bg-opacity-5 rounded-lg">
            <div ref={sliderContainer} className="relative w-full h-[245px] overflow-x-hidden">
              
              <div className="slider_btn_wrap">
                <button onClick={handleLeft} className="tway_slider_btn left-2">
                  <ArrowBigLeft size={30} />
                </button>
                <button onClick={handleRight} className="tway_slider_btn right-2">
                  <ArrowBigRight size={30} />
                </button>
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
        </div>

      </div>

    </div>

  )
}

export default Home