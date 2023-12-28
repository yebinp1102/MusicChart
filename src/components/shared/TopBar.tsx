import { Link, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { MdLogout } from "react-icons/md";
import { useLogout } from "@/lib/react-query/queries";
import { InitialUser, useUserContext } from "@/context/AuthContext";


const TopBar = () => {
  const navigate = useNavigate();
  const {mutate: logout} = useLogout();
  const {user, setUser, setIsAuthenticated} = useUserContext();

  const handleLogout = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    logout();
    setIsAuthenticated(false);
    setUser(InitialUser);
    navigate('/login');
  }

  return (
    <section className="w-full lg:hidden sticky top-0 z-50 bg-dark-3">
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
            onClick={(e) => handleLogout(e)}
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