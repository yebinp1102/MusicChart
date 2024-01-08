import GridSongList from "@/components/shared/GridSongList";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useGetSongs } from "@/lib/react-query/queries"

const Explore = () => {
  const {data: songs, fetchNextPage, hasNextPage} = useGetSongs();

  if(!songs){
    return (
      <div className="w-full h-full">
        <Loader />
      </div>
    )
  }

  const shouldShowSongs = songs.pages.every((song) => song?.documents.length === 0)

  return (
    <div className="explore-container w-full">
      <div className="explore_inner-container">

        <div className="max-w-6xl mx-auto border h-[400px] relative">
          <img 
            src="public/assets/images/explore-banner.jpg" 
            alt="banner" 
            className="w-full object-cover h-full object-top" 
          />
          <div className="absolute top-0 left-0 bg-black w-full h-full opacity-60"></div>
         
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-end gap-4 p-10">

            <div className="flex justify-between items-center">
              <h1 className="text-[60px] font-extrabold">POP</h1>
              <div className="flex items-center gap-3">
                <Button className="blueGreen-linear rounded-3xl gap-2 flex items-center py-6 px-10">
                  <img
                    src="/assets/icons/play-btn.svg"
                    width={24}
                    height={24}
                  />
                  <p className="text-[1rem] font-bold">재생</p>
                </Button>
                <div className="border p-2 rounded-[50%] border-primary-500">
                  <img 
                    src="/assets/icons/like.svg"
                    width={25}
                    height={25}
                  />
                </div>  
              </div>

                 


            </div>
            <ul className="flex gap-6 text-light-3 cursor-pointer">
              <li>둘러보기</li>
              <li>앨범</li>
              <li>아티스트</li>
              <li>자세히</li>
              <li>더보기</li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <h3 className="h4-bold w-full my-8 border-b pb-6">오늘의 인기곡</h3>

          <div className="">
            {shouldShowSongs ? (
              <p className="">End of songs</p>
            ):(
              <div>
                {songs.pages.map((song, idx) => (
                  <GridSongList key={`page-${idx}`} songs={song?.documents} />            
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Explore