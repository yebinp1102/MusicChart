import SongForm from '@/components/forms/SongForm';
import { useUserContext } from '@/context/AuthContext';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const navigate = useNavigate();
  const {user} = useUserContext();

  // isAdmin: true인 유저만 접근 가능한 페이지
  useEffect(() => {
    if(!user.isAdmin) navigate("/")
  },[user])


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
          <h2 className="h3-bold md:h3-bold">새로운 곡 추가하기</h2>
        </div>

        <SongForm action="Create" />
      </div>
    </div>
  )
}

export default EditProfile