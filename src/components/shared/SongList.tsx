import { Models } from 'appwrite'
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

type Props = {
  song: Models.Document;
}

const SongList = ({song}: Props) => {

  return (
    <div className='w-full border-[0.5px] bg-dark-3 border-light-4 rounded-[10px] mb-2 h-[100px] py-[10px] px-6 flex'>
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
          <p>{song.title}</p>
          <p className='text-[0.9rem] text-light-3'>{song.singer}</p>
        </div>

        {/* buttons */}
        <div className='flex items-center gap-3'>
          <div className="border p-2 rounded-[50%] border-primary-500">
            <img 
              src="/assets/icons/like.svg"
              width={18}
              height={18}
            />
          </div>  
          <Button className="bg-primary-500 rounded-xl gap-2 flex items-center ">
            <img
              src="/assets/icons/play-btn.svg"
              width={20}
              height={20}
            />
            <p className="text-[0.75rem] font-bold">재생</p>
          </Button>
        </div>
      </div>

      
    </div>
  )
}

export default SongList