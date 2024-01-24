import { Models } from "appwrite"
import { Link } from "react-router-dom";

type Props = {
  songs?: Models.Document[];
}

const GridSongList = ({songs} :Props) => {

  return (
    <>
      {songs?.map((song) => (
        <li key={song.$id} className="grid-item bg-dark-4 w-[150px]">
          <Link to={`/song/detail/${song.$id}`}>
            <img src={song.imageUrl} alt={song.title} className="w-[150px] h-[150px]" />
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