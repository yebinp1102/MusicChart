import Loader from "@/components/shared/Loader";
import SongInfoCard from "@/components/shared/SongInfoCard";
import { useGetCurrentUser } from "@/lib/react-query/queries"
import { Models } from "appwrite";

const LikeList = () => {
  const {data: user, isPending: isGettingUser} = useGetCurrentUser();

  if(isGettingUser || !user){
    return (
      <div className="w-full h-screen lg:h-full flex items-center justify-center relative">
        <Loader />
        <h2 className="h2-bold ml-4">로딩 중입니다.</h2>
      </div>
    )
  }
  return (
    <div className="flex relative py-4">
      <div className="w-full mb-[165px] lg:mb-[72px]">

        <div className="max-w-5xl bg-light-1 rounded-lg bg-opacity-10 h-full mx-auto p-4 flex flex-col gap-4">

          <div className="flex gap-4 items-center p-4 border-b border-light-3 pb-5">
            <img 
              src="/assets/icons/like-white.svg"
              width={50}
              height={50}
            />
            <div className="flex flex-col">
              <p className="h3-bold">{user.name} 님의 좋아요 목록</p>
              <p className="text-light-3 mt-1">총 {user.liked.length}개의 곡에 좋아요를 눌렀습니다.</p>
            </div>
          </div>

          <div className="flex gap-3 pl-3 py-1 my-4 lg:my-0 justify-end">
            <div className="bg-primary-500 px-2 py-[2px]">최신 순서</div>
            <div className="bg-primary-500 px-2 py-[2px]">이름 순서</div>
            <div className="bg-primary-500 px-2 py-[2px]">발매 순서</div>
          </div>

          <div className="p-4 gap-5 h-full grid grid-cols-2 lg:grid-cols-3 place-items-center">
            {user.liked.map((song: Models.Document) => (
              <SongInfoCard title={song.title} subText={song.singer} coverArtScr={song.imageUrl} link={`/song/detail/${song.$id}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="gradient-primary-full absolute top-0 z-[-10]">
          <div className="bg-black-opacity"></div>
        </div>
    </div>
  )
}

export default LikeList