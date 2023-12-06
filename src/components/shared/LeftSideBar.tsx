import { sidebarMenuLinks, sidebarPrivateLinks } from "@/constants"
import { InitialUser, useUserContext } from "@/context/AuthContext";
import { useLogout } from "@/lib/react-query/queries";
import { NavLinkType } from "@/types"
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import { Button } from "../ui/button";
import { MdLogout } from "react-icons/md";
import React from "react";
import Loader from "./Loader";

const LeftSideBar = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const {user, setUser, setIsAuthenticated, isLoading} = useUserContext();

  const {mutate: logout} = useLogout();

  const handleLogout = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    logout();
    setIsAuthenticated(false);
    setUser(InitialUser);
    navigate('/login');
  }

  return (
    <nav className="hidden md:flex flex-col justify-between px-6 py-10 min-w-[270px] border-r">
      <div className="flex flex-col gap-5">
        {/* Logo */}
        <Link to="/" className="flex gap-2 items-center mb-12 pl-2">
          <img 
            src="/assets/icons/logo.svg"
            alt="logo"
            width={40}
          />
          <h2 className="h4-bold pb-1 text-primary-500">Music Chart</h2>
        </Link>


        <div>
          {/* Menu links */}
          <div className=" text-light-3 font-bold mb-4">Menu</div>
          <ul className="flex flex-col gap-2">
            {sidebarMenuLinks.map((link: NavLinkType) => {
              const isActive = pathname === link.route;
              return (
                <li key={link.label} className={`leftsidebar-link group ${isActive && "bg-primary-500"}`}>
                  <NavLink to={link.route} className="flex gap-4 items-center p-3">
                    <img 
                      src={link.imgUrl} 
                      alt={link.label} 
                      className={`w-7 h-7 group-hover:invert-white ${isActive && "invert-white"}`}
                    />{link.label}
                  </NavLink>
                </li>
              )
            })}
          </ul>

          {/* Private links */}
          <div className=" text-light-3 font-bold mt-16 mb-4">Private</div>
          <ul className="flex flex-col gap-2">
            {sidebarPrivateLinks.map((link: NavLinkType) => {
              const isActive = pathname === link.route;
              return (
                <li key={link.label} className={`leftsidebar-link group ${isActive && "bg-primary-500"}`}>
                  <NavLink to={link.route} className="flex gap-4 items-center p-3">
                    <img 
                      src={link.imgUrl} 
                      alt={link.label} 
                      className={`w-7 h-7 group-hover:invert-white ${isActive && "invert-white"}`}
                    />
                    {link.label}
                  </NavLink>
                </li>
              )
            })}
          </ul>
      </div>


      </div>


      <div className="flex flex-col gap-5">
        {/* User */}
        {isLoading || !user.email ? (
          <div className="h-14">
            <Loader />
          </div>
        ): (
          <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
            <img 
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="h-9 w-9 rounded-full"
            />
            <div className="flex flex-col">
              <p>{user.name}</p>
              <p className="text-[14px] text-light-3">{user.email}</p>
            </div>
          </Link>
        )}


        <Button variant="ghost" className="shad-button_primary" onClick={(e) => handleLogout(e)}>
          <MdLogout />
          <p>로그아웃</p>
        </Button>
      </div>

    </nav>
  )
}

export default LeftSideBar