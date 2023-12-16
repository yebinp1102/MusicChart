import { Models } from "appwrite"
import { Link } from "react-router-dom"

type Props = {
  song: Models.Document
}

// singer, title, imageUrl(hover시 커짐)

const SongCard = ({song} : Props) => {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <Link 
        to={`/song/detail/${song.$id}`} 
        className="overflow-hidden"
        
      >
        <img 
          src={song.imageUrl}
          className="rounded-[10px] object-cover w-[105px] h-[105px] md:h-[135px] md:w-[135px] 3xl:w-full 3xl:h-full"
          alt="album cover img"
        />
      </Link>

      <div className="flex flex-col mt-2 px-1 w-full">
        <div className="tracking-wide text-[12px] lg:text-sm">{song.title.length > 13 ? `${song.title.slice(0, 13)}...` : song.title}</div>
        <div className="text-light-3 text-[11px] lg:text-[13px] tracking-wider">{song.singer.length > 10 ? `${song.singer.slice(0, 10)}...` : song.singer}</div>
      </div>
    </div>
  )
}

export default SongCard