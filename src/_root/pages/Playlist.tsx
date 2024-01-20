import Loader from "@/components/shared/Loader";
import SongList from "@/components/shared/SongList";
import { useUserContext } from "@/context/AuthContext"
import { useGetMyPlaylist } from "@/lib/react-query/queries";

const Playlist = () => {
  const {user} = useUserContext();

  if(!user) return <Loader />

  const {data: playlist} = useGetMyPlaylist(user.id);

  console.log(playlist?.documents[0]);
  return (
    <div className="flex-full-screen">

      {/* background color */}
      <div className="gradient-primary-full absolute z-[-10]">
        <div className="bg-black-opacity"></div>
      </div>

      <div className="w-full h-full flex flex-col xl:flex-row p-5 gap-3 pb-[150px]">

        {/* current track */}
        <div className="flex-1 flex items-center justify-center flex-col">

        {/* track image */}
          <img
            src={playlist?.documents[0].song.imageUrl}
            alt="track_cover_image"
            className=" w-[320px] h-[320px] relative"
          />

          {/* track meta data */}
          <div className="flex flex-col mt-4">
            <p className="lg:h2-bold h3-bold mb-3">{playlist?.documents[0].song.title}</p>
            <p className="text-light-3">{playlist?.documents[0].song.singer}</p>
          </div>
        </div>

        {/* playlist */}
        <div className="xl:flex-1 w-full h-full mx-auto bg-light-3 bg-opacity-10 rounded-xl p-4 overflow-y-scroll">
          {playlist?.documents.map(song => (
            <SongList song={song.song} key={song.$id} />
          ))}
        </div>

      </div>
    </div>
  )
}

export default Playlist