import { Models } from "appwrite"
import { Link } from "react-router-dom";

type Props = {
  songs?: Models.Document[];
}

const GridSongList = ({songs} :Props) => {

  return (
    <>
      {songs?.map((song) => (
        <li key={song.$id} className="bg-dark-4 w-[200px]">
          <Link to={`/song/detail/${song.$id}`}>
            <img src={song.imageUrl} alt={song.title} className="w-[200px] h-[200px] object-cover shrink-0" />
          </Link>
          <div className="p-1.5">
            <p className="text-xs my-1  text-primary-500">{song.title}</p>
            <p className="text-[11px] text-light-3">{song.singer}</p>
          </div>
        </li>
      ))}

    </>
  )
}

export default GridSongList