import Loader from "@/components/shared/Loader";
import { profileSliderMenuLinks } from "@/constants";
import { useGetCurrentUser } from "@/lib/react-query/queries";
import { ProfileMenuLinkType } from "@/types";

const Profile = () => {
  const {data: userInfo, isFetching: isGettingUserDetail} = useGetCurrentUser();
  console.log(userInfo);
  if(isGettingUserDetail) return (
    <div className="w-full h-full border flex items-center justify-center gap-4">
      <Loader /> <h1 className="h2-bold">유저 정보를 받아오는 중입니다.</h1>
    </div>
  )

  return (
    <div className="flex-full-screen mb-[180px] lg:mb-[72px] p-4">

      <div className="flex flex-col max-w-5xl w-full mx-auto h-full relative">
        
        {/* top - 알림창 */}
        <div className="flex w-full py-6 px-10 justify-end ">
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
          <img
                src="/assets/icons/hamburger.svg"
                width={28}
                height={28}
                alt="mail_icon"
              />
          </div>

        </div>


        <div className="px-8 pb-4 border-light-4 border-b">
          <button className="bg-primary-500 text-white px-3 py-1 rounded-sm text-[0.9rem]">나의 상세 프로필</button>
        </div>

        {/* 유저 정보 */}
        <div className="flex p-8 mb-20">
          {/* left */}
          <div className="flex flex-col items-center gap-2 border-light-4 pr-10 border-r-[1px]">
            <img 
              src={userInfo?.imageUrl}
              className="w-[65px] h-[65px] rounded-full"
              alt="img"
            />
            <h4 className="h4-bold">{userInfo?.name}</h4>
          </div>

          {/* right */}
          <div className="flex flex-1 pl-8 justify-between text-light-3">
            <div className="flex flex-col justify-center h-full">
              <p>이메일 : {userInfo?.email}</p>
              <p>가입일 : {userInfo?.$createdAt.slice(0, 10)}</p>
              <p>멤버쉽 등급 : Silver</p>
            </div>
            <img 
              src="/assets/icons/config.svg"
              width={30}
              height={30}
              className=" self-start"
            />
          </div>
        </div>

        {/* 컨텐츠 링크 */}
        <div className="w-full h-full">
          <div className="flex flex-col w-full h-full ">

            {/* btns */}
            <div className="px-8 pb-4 border-light-4 border-b">
              <button className="bg-primary-500 px-3 py-1 rounded-sm text-[0.9rem]">나의 활동 살펴보기</button>
            </div>

            {/* contents links */}
            <div className="flex items-center border-light-4 w-full h-full relative" > {/* 슬라이더 container */}
              <div className="flex gap-10 items-center absolute "> {/* 움직일 슬라이더 - 넓은 width */}              
                {profileSliderMenuLinks.map((link: ProfileMenuLinkType, idx: number) => (
                  idx === 0 ? (
                    <div className={`relative flex justify-end px-4 pb-8 flex-col w-[270px] h-[290px] rounded-[10%] ${link.color}`}>
                      <div className="flex justify-between relative">
                        <div className="flex flex-col">
                          <h3 className="h3-bold mb-2">{link.title}</h3>
                          <p>{link.description}</p>
                        </div>
                        <img 
                          src="/assets/icons/arrowNext.svg"  
                          className="w-[50px] h-[50px] self-end bg-white opacity-60 rounded-full"
                        />
                      </div>
                      <img 
                        src={link.icon}
                        width={180}
                        height={180}
                        className="absolute -top-14 right-0"
                      />
                    </div>
                  ) : (
                    <div className={`relative self-end duration-150 flex justify-end px-4 pb-8 flex-col w-[270px] hover:h-[290px] h-[230px] rounded-[10%] ${link.color}`}>
                      <div className="flex gap-3 justify-between">
                        <div className="flex flex-col">
                          <h3 className="h3-bold mb-2">{link.title}</h3>
                          <p>{link.description}</p>
                        </div>
                        <img 
                          src="/assets/icons/arrowNext.svg"  
                          className="w-[50px] h-[50px] self-end bg-white opacity-60 rounded-full"
                        />
                      </div>
                      <img 
                        src={link.icon}
                        width={150}
                        height={150}
                        className="absolute -top-14 right-0"
                      />
                    </div>
                  )

                ))}
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile