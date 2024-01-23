import { Models } from 'appwrite'
import { Link } from 'react-router-dom';
import Likes from './Likes';
import AddPlaylistBtn from './AddPlaylistBtn';

type Props = {
  song: Models.Document;
  userId: string,
  page?: string,
  first?: boolean
}

const SongList = ({song, userId, page, first}: Props) => {

  return (
    <div className={`w-full border-[0.5px] ${first ? 'bg-[#092635] border-dark-1' : 'bg-dark-3 border-light-4'} rounded-[10px] mb-2 h-[100px] py-[10px] px-6 flex`}>
      {/* img */}
      <Link to={`/song/detail/${song.$id}`}>
        <img 
          src={song.imageUrl}
          className='w-[79px] h-[79px] object-cover'
          alt='song_cover_img'
        />
      </Link>


      <div className='flex justify-between flex-1'>
        {/* title, singer */}
        <div className='flex flex-col justify-center ml-6 gap-1'>
          <p className='text-[0.9rem]'>{song.title}</p>
          <p className='text-[0.85rem] text-light-3'>{song.singer}</p>
        </div>

        {/* buttons */}
        <div className='flex items-center gap-3'>

          {/* like btn */}
          <Likes song={song} userId={userId} page={page} />

          {/* play btn */}
          <img
            src="/assets/icons/play-btn.svg"
            width={24}
            height={24}
            className='cursor-pointer'
          />

          {/* delete from list btn */}
          {page && (
            <AddPlaylistBtn song={song} userId={userId} page={page} />
          )}
        </div>
      </div>

      
    </div>
  )
}

export default SongList