import ProfileForm from '@/components/forms/ProfileForm';
import { useGetCurrentUser } from '@/lib/react-query/queries';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const navigate = useNavigate();
  const {data: user, isPending: isGettingUser} = useGetCurrentUser()

  if(!user && !isGettingUser) navigate("/")


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
          <h2 className="h3-bold md:h3-bold">프로필 정보 수정하기</h2>
        </div>

        <ProfileForm user={user} />
      </div>
    </div>
  )
}

export default EditProfile