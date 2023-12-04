import { Link, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { MdLogout } from "react-icons/md";
import { useLogout } from "@/lib/react-query/queries";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";


const TopBar = () => {
  const navigate = useNavigate();
  const {user} = useUserContext();
  const {mutate: Logout, isSuccess} = useLogout();

  useEffect(() => {
    if(isSuccess) navigate(0); // 새로고침
  },[isSuccess])

  return (
    <section className="w-full md:hidden sticky top-0 z-50">
      <div className="p-5 flex justify-between items-center">
        {/* left side : logo */}
        <Link to="/" className="flex gap-2 items-center">
          <img 
            src="/assets/icons/logo.svg"
            alt="logo"
            width={48}
          />
          <h2 className="h3-bold text-primary-500">Music Chart</h2>
        </Link>

        {/* right side */}
        <div className="flex gap-6 items-center">

          {/* logout btn */}
          <Button
            variant="ghost"
            className="shad-button_primary"
            onClick={() => Logout()}
          >
            로그아웃
            <MdLogout />
          </Button>

          {/* profile btn */}
          <Link to={`/profile/${user.id}`} >
            <img 
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="h-9 w-9 rounded-full"
            />
          </Link>

        </div>

      </div>
    </section>
  )
}

export default TopBar