import Loader from "@/components/shared/Loader";
import { useGetCurrentUser } from "@/lib/react-query/queries";

const Profile = () => {
  const {data: userInfo, isFetching: isGettingUserDetail} = useGetCurrentUser();
  console.log(userInfo);

  // if(isGettingUserDetail) return (
  //   <div className="w-full h-full border flex items-center justify-center gap-4">
  //     <Loader /> <h1 className="h2-bold">유저 정보를 받아오는 중입니다.</h1>
  //   </div>
  // )

  return (
    <div className="flex-full-screen lg:mb-[72px]">

      <div className="flex flex-col max-w-5xl w-full mx-auto h-full relative">
        
        {/* top - 알림창 */}
        <div className="flex w-full border-light-4 border-b-[1px] py-6 px-10 justify-between items-center">
          {/* icons */}
          <div className="flex gap-6">
              <img
                src="/assets/icons/mail.svg"
                width={28}
                height={28}
                alt="mail_icon"
              />
              <img
                src="/assets/icons/bell.svg"
                width={32}
                height={32}
                alt="mail_icon"
              />
          </div>
          <img
                src="/assets/icons/hamburger.svg"
                width={28}
                height={28}
                alt="mail_icon"
              />
        </div>

        {/* 유저 정보 */}
        <div className="flex p-8 border-b-[1px] border-light-4">
          {/* left */}
          <div className="flex flex-col items-center gap-2 border-light-4 pr-10 border-r-[1px]">
            <img 
              // src={userInfo?.imageUrl}
              className="w-[60px] h-[60px] rounded-full border"
              alt="img"
            />
            <h4 className="h4-bold">user name</h4>
          </div>

          {/* right */}
          <div className="flex pl-8 justify-between flex-1 text-light-3">
            <div className="flex flex-col justify-center">
              <p>이메일 : email@naver.com</p>
              <p>가입일 : 2024-1-23</p>
            </div>
            <img 
              className="self-start pt-4"
              src="/assets/icons/config.svg"
              width={26}
              height={26}
            />
          </div>
        </div>

        {/* 컨텐츠 링크 */}
        <div className="flex flex-col h-full p-4 border-light-4">
          <div className="w-full ">
            {/* btns */}
            <div className="flex gap-4 justify-end my-8">
              <div className="bg-primary-500 px-3 py-1 rounded-sm text-[0.9rem]">나의 활동 살펴보기</div>
              <div className="border px-3 py-1 border-primary-500 text-[0.9rem] text-primary-500">+ Add column</div>
            </div>

            {/* contents links */}
            <div className="grid  grid-cols-3 gap-2">
              <div className="w-[full] h-[250px] bg-primary-500 flex items-center justify-center">
                <div className="max-w-[300px] h-[200px] bg-white w-full">??</div>
              </div>
              <div className="w-[full] h-[250px] bg-primary-500 flex items-center justify-center">
                <div className="max-w-[300px] h-[200px] bg-white w-full">??</div>
              </div>
              <div className="w-[full] h-[250px] bg-primary-500 flex items-center justify-center">
                <div className="max-w-[300px] h-[200px] bg-white w-full">??</div>
              </div>
              <div className="w-[full] h-[250px] bg-primary-500 flex items-center justify-center">
                <div className="max-w-[300px] h-[200px] bg-white w-full">??</div>
              </div>
              <div className="w-[full] h-[250px] bg-primary-500 flex items-center justify-center">
                <div className="max-w-[300px] h-[200px] bg-white w-full">??</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile