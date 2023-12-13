import { Models } from "appwrite"
import { Link } from "react-router-dom"

type Props = {
  song: Models.Document
}

// singer, title, imageUrl(hover시 커짐)

const SongCard = ({song} : Props) => {
  console.log(song);
  return (
    <div className="flex flex-col ">
      <Link to={`/song/detail/${song.$id}`} className=" overflow-hidden">
        <img 
          src={song.imageUrl}
          className="h-[240px] w-[240px] rounded-[10px] object-cover mb-5;"
          alt="album cover img"
        />
      </Link>

      <div className="flex flex-col mt-2 px-1">
        <div className="tracking-wide">{song.title}</div>
        <div className="text-light-3 text-[13px] tracking-wider">{song.singer}</div>
      </div>
    </div>
  )
}

export default SongCard