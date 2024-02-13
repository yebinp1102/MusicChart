import GridSongList from "@/components/shared/GridSongList";
import Loader from "@/components/shared/Loader";
import { useGetSongs } from "@/lib/react-query/queries";
import { useEffect } from "react";
import {useInView} from 'react-intersection-observer'

const Explore = () => {
  const {ref, inView} = useInView();
  const {data: songs, fetchNextPage, hasNextPage} = useGetSongs();
  // console.log(hasNextPage, songs)

  useEffect(() => {
    if(inView) fetchNextPage();
  },[inView])


  if(!songs){
    return (
      <div className="w-full h-full flex items-center justify-center gap-4">
        <Loader /> <span className="text-2xl">곡 정보를 불러오는 중입니다...</span>
      </div>
    )
  }

  const shouldShowSongs = songs.pages.every((song) => song?.documents.length === 0)

  return (
    <div className="w-full mb-72">
      <div>
        <div className="max-w-5xl mx-auto h-[400px] relative">

          <img 
            src="public/assets/images/explore-banner.jpg" 
            alt="banner" 
            className="w-full object-cover h-full object-top" 
          />
          <div className="absolute top-0 left-0 bg-black w-full h-full opacity-60"></div>
        
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-end gap-4 p-10">

            <div className="flex justify-between items-center">
              <h1 className="text-[60px] font-extrabold">POP</h1>
              <div className="border p-2 rounded-[50%] border-primary-500 self-end">
                <img 
                  src="/assets/icons/liked.svg"
                  width={30}
                  height={30}
                />
              </div>  
            </div>

            <ul className="explore-menu-wrap">
              <li className="">둘러보기</li>
              <li>앨범</li>
              <li>아티스트</li>
              <li>자세히</li>
              <li>더보기</li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-5xl mx-auto lg:p-8 p-4">
          <h3 className="h4-bold w-full border-b mb-10 p-4">오늘의 인기곡</h3>

          <div className="">
            {shouldShowSongs ? (
              <p className="">End of songs</p>
            ):(
              <div className="flex justify-center">
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-[4rem] md:gap-x-[6rem] gap-y-[3.5rem]">
                  {songs.pages.map((song, idx) => (
                    <GridSongList key={`page-${idx}`} songs={song?.documents} />            
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {hasNextPage && (
        <div ref={ref} className="w-full flex items-center justify-center mt-12 gap-4">
          <Loader /> <span className="text-xl">더 많은 곡을 불러오는 중입니다...</span>
        </div>
      )}
    </div>
  )
}

export default Explore