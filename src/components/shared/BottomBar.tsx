import { bottomLinks } from "@/constants";
import { NavLinkType } from "@/types";
import { Link, useLocation } from "react-router-dom"

const BottomBar = () => {
  const {pathname} = useLocation();

  return (
    <nav className="flex z-50 w-full md:hidden sticky bottom-0 justify-between bg-dark-3 py-4 px-5 rounded-t-[20px] gap-3">

      {bottomLinks.map((link: NavLinkType) => {
        const isActive = pathname === link.route
        return (
          <Link 
            to={link.route} 
            key={link.label} 
            className={`${
              isActive && "rounded-[10px] bg-primary-500"
            } p-2 gap-1 flex flex-col items-center justify-center transition w-full`}
          >
            <img 
              src={link.imgUrl}
              alt={link.label}
              className={`${isActive && "invert-white"}`}
              width={24}
            />
            <p className="text-[12px] font-medium text-light-2">{link.label}</p>
          </Link>
        )
      })}
    </nav>
  )
}

export default BottomBar