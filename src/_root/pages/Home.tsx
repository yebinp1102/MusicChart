import Loader from "@/components/shared/Loader";
import SongCard from "@/components/shared/SongCard";
import { useGetRecentSongs } from "@/lib/react-query/queries"
import { Models } from "appwrite";

const Home = () => {
  const {data: songs, isLoading: isSongLoading, isError: isErrorSongs } = useGetRecentSongs();

  if(isErrorSongs){
    return (
      <div className="">
        곡을 불러오는데 에러가 발생했습니다.
      </div>
    )
  }
// flex flex-col flex-1 items-center gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar;

  return (
    <div className="flex flex-1">

      
      <div className="flex flex-1 flex-col items-center gap-10 p-16 overflow-scroll">

        {/* 최신곡 나열 */}
        <div className=" max-w-5xl">
          <h2 className="text-2xl font-semibold">최신곡</h2>
          <div className=" text-light-3 mt-2 mb-4">매일 추가되는 새로운 곡을 즐겨보세요.</div>
          <hr className=" border-light-4" />
          {isSongLoading ? (
            <Loader />
          ): (
            <ul className="flex gap-9 pt-10 overflow-scroll flex-1">
              {songs?.documents.map((song: Models.Document) => (
                <li key={song.$id} className="">
                    <SongCard song={song} />
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 인기곡 나열 */}
        <div className=" max-w-5xl">
          <h2 className="text-2xl font-semibold">인기곡</h2>
          <div className=" text-light-3 mt-2 mb-4">매일 추가되는 새로운 곡을 즐겨보세요.</div>
          <hr className=" border-light-4" />
          {isSongLoading ? (
            <Loader />
          ): (
            <ul className="flex gap-9 pt-10 overflow-scroll flex-1">
              {songs?.documents.map((song: Models.Document) => (
                <li key={song.$id} className="">
                    <SongCard song={song} />
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 추천곡 나열 */}
        <div className=" max-w-5xl">
          <h2 className="text-2xl font-semibold">추천곡</h2>
          <div className=" text-light-3 mt-2 mb-4">매일 추가되는 새로운 곡을 즐겨보세요.</div>
          <hr className=" border-light-4" />
          {isSongLoading ? (
            <Loader />
          ): (
            <ul className="flex gap-9 pt-10 overflow-scroll flex-1">
              {songs?.documents.map((song: Models.Document) => (
                <li key={song.$id} className="">
                    <SongCard song={song} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home