import Loader from "@/components/shared/Loader";
import SongList from "@/components/shared/SongList";
import { useUserContext } from "@/context/AuthContext"
import { useGetMyPlaylist } from "@/lib/react-query/queries";

const Playlist = () => {
  const {user} = useUserContext();

  if(user.id === '') return (
      <div className="flex w-screen h-screen gap-4 mt-[20rem] justify-center ">
      <Loader /> 
      <h1 className="text-[1.5rem] font-bold">유저의 정보를 받아오는 중입니다 ...</h1>
    </div>
  )

  const {data: playlist, isFetching: isGettingPlaylist} = useGetMyPlaylist(user.id);

  return (
    <div className="flex-full-screen">
      {isGettingPlaylist ? (
          <div className="flex w-screen h-screen gap-4 mt-[20rem] justify-center ">
            <Loader /> 
            <h1 className="text-[1.5rem] font-bold">유저의 플레이 리스트를 받아오는 중입니다 ...</h1>
          </div>
        ): (
          <div className="w-full h-full flex flex-col lg:flex-row p-5 gap-3 pb-[20px] lg:pb-[150px]">
          {/* current track */}
            <div className="flex-1 flex items-center justify-center flex-col">

              {/* track image */}
              <img
                src={playlist?.documents[0].song.imageUrl}
                alt="track_cover_image"
                className="w-[270px] h-[270px] lg:w-[320px] lg:h-[320px] relative"
              />

              {/* track meta data */}
              <div className="flex flex-col my-4">
                <p className="lg:h2-bold h3-bold mb-3">{playlist?.documents[0].song.title}</p>
                <p className="text-light-3">{playlist?.documents[0].song.singer}</p>
              </div>
            </div>

          {/* playlist */}
            <div className="lg:flex-1 w-full h-full mx-auto bg-light-3 bg-opacity-10 rounded-xl p-4 overflow-y-scroll">
              {playlist?.documents.map(song => (
                <SongList song={song.song} key={song.$id} userId={user.id} page={"playlist"} />
              ))}
            </div>
          </div>
        )}
      {/* background color */}
      <div className="gradient-primary-full absolute z-[-10]">
        <div className="bg-black-opacity"></div>
      </div>

    </div>
  )
}

export default Playlist