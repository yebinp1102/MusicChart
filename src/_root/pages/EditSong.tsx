import SongForm from '@/components/forms/SongForm';
import Loader from '@/components/shared/Loader';
import { useUserContext } from '@/context/AuthContext';
import { useGetSongDetail } from '@/lib/react-query/queries';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'

const EditSong = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const {user} = useUserContext();
  const { data: song, isPending: isGettingDetail } = useGetSongDetail(id);
  
  useEffect(() => {
    if(!user.isAdmin) navigate('/');
  },[user]);

  if(isGettingDetail) return <Loader />

  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 gap-10 items-center overflow-scroll py-10 px-5 md:px-8 lg:p-14 ">

        <div className="flex justify-start items-center gap-2 w-full max-w-5xl">
          <img 
            src="/assets/icons/add-song.svg"
            width={48}
            height={48}
            alt="add"
          />
          <h2 className="h3-bold md:h3-bold">곡 정보 수정하기</h2>
        </div>

        <SongForm action="Edit" song={song} />
      </div>
    </div>
  )
}

export default EditSong