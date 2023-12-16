import HomeBanner from "@/components/shared/HomeBanner";
import Loader from "@/components/shared/Loader";
import SongCard from "@/components/shared/SongCard";
import { Button } from "@/components/ui/button";
import { useGetRecentSongs } from "@/lib/react-query/queries"
import { Models } from "appwrite";
import { useEffect, useState } from "react";

const Home = () => {
  const {data: songs, isPending: isSongLoading, isError: isErrorSongs } = useGetRecentSongs();
  const [windowSize, setWindowSize] = useState<number | undefined>(undefined);

  useEffect(()=>{
    if(typeof window !== 'undefined'){
      const handleResize = () => {
        setWindowSize(window.innerWidth)
      };
      window.addEventListener('resize', handleResize)
      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }else{
      return () => window.removeEventListener("resize", () => {
        return null
      })
    }
  },[])

  console.log(windowSize);

  const song = songs?.documents[0]
  if(isErrorSongs){
    return (
      <div className="">
        곡을 불러오는데 에러가 발생했습니다.
      </div>
    )
  }

  return (
    <div className="flex flex-col content-between w-full h-screen">

      <div className="relative w-full h-[65%]">
        <HomeBanner song={songs?.documents[0]} />

        <div className="flex flex-col h-full px-10">
          <div className="flex flex-col justify-center h-full">
            {/* introduction */}
            <div className=" text-gray-600 mb-1">오늘의 추천곡</div>
            <div className=" h2-bold lg:h1-bold mb-4">{song?.singer} : {song?.title}</div>
            <div className=" leading-7 text-sm text-light-3">
              오늘의 추천곡은 훌륭한 아티스트 {song?.singer}의 {song?.title} 입니다.  &nbsp;
              {windowSize >= 640 && <br/>}
              {song?.title}를 듣고, 나의 하루에 특별함 한스푼을 곁들여 보는 것은 어떨까요?
            </div>

            {/* button */}          
            <div className="flex gap-3 mt-8 items-center">
              <Button className="shad-button_primary py-4 px-12">
                <img src='/assets/icons/play.svg' width={18} height={18} />
                재생</Button>
              <Button variant="outline" className="shad-button_primary_outline px-12 py-5">더보기</Button>
            </div>

          </div>

          {/* 최신곡 나열 */}
          <div className=" max-w-full">
            <h2 className="text-xl font-semibold">최신곡</h2>
            <div className=" text-light-3 text-sm mt-1 mb-4">매일 추가되는 새로운 곡을 즐겨보세요.</div>
            <hr className=" border-light-4" />
            {isSongLoading ? (
              <Loader />
            ): (
              <ul className="flex 3xl:gap-5 justify-between pt-5">
                { windowSize >= 1800 ? (
                  // window : 1800 ~ 
                  <>
                    {
                      songs?.documents.map((song: Models.Document) => (
                        <li key={song.$id}>
                            <SongCard song={song} />
                        </li>
                      ))
                    }
                  </>
                ): (
                  <>
                    { windowSize >= 1480 ? (
                      // window: 1480 ~ 1800
                      <>
                        {songs?.documents.slice(0,7).map((song: Models.Document) => (
                            <li key={song.$id}>
                                <SongCard song={song} />
                            </li>
                          ))
                        }
                      </>
                    ): (
                      <>
                        { windowSize >= 1330 ? (
                          // window: 1330 ~ 1480
                          <>
                            {songs?.documents.slice(0,6).map((song: Models.Document) => (
                              <li key={song.$id}>
                                  <SongCard song={song} />
                              </li>
                            ))}
                          </>
                        ) : (
                            // window: 0 ~ 1330
                          <>
                            { windowSize >= 768 ? 
                              (songs?.documents.slice(0,5).map((song: Models.Document) => (
                                <li key={song.$id}>
                                    <SongCard song={song} />
                                </li>
                              )))
                            :(songs?.documents.slice(0,4).map((song: Models.Document) => (
                              <li key={song.$id}>
                                  <SongCard song={song} />
                              </li>
                            )))}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </ul>
            )}
          </div>
        </div>

      </div>



        
        {/* 인기곡 나열 */}
        <div className=" max-w-full px-10 mt-10">
            <h2 className="text-xl font-semibold mb-4">인기곡</h2>
            <hr className=" border-light-4" />
            {isSongLoading ? (
              <Loader />
            ): (
              <ul className="flex 3xl:gap-5 justify-between pt-5">
                { windowSize >= 1800 ? (
                  // window : 1800 ~ 
                  <>
                    {
                      songs?.documents.map((song: Models.Document) => (
                        <li key={song.$id}>
                            <SongCard song={song} />
                        </li>
                      ))
                    }
                  </>
                ): (
                  <>
                    { windowSize >= 1480 ? (
                      // window: 1480 ~ 1800
                      <>
                        {songs?.documents.slice(0,7).map((song: Models.Document) => (
                            <li key={song.$id}>
                                <SongCard song={song} />
                            </li>
                          ))
                        }
                      </>
                    ): (
                      <>
                        { windowSize >= 1330 ? (
                          // window: 1330 ~ 1480
                          <>
                            {songs?.documents.slice(0,6).map((song: Models.Document) => (
                              <li key={song.$id}>
                                  <SongCard song={song} />
                              </li>
                            ))}
                          </>
                        ) : (
                            // window: 0 ~ 1330
                          <>
                            { windowSize >= 768 ? 
                              (songs?.documents.slice(0,5).map((song: Models.Document) => (
                                <li key={song.$id}>
                                    <SongCard song={song} />
                                </li>
                              )))
                            :(songs?.documents.slice(0,4).map((song: Models.Document) => (
                              <li key={song.$id}>
                                  <SongCard song={song} />
                              </li>
                            )))}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </ul>
            )}
        </div>

      </div>
      
      );
}

export default Home