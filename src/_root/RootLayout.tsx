import { Outlet } from "react-router-dom"
import TopBar from "@/components/shared/TopBar";
import LeftSideBar from "@/components/shared/LeftSideBar";
import BottomBar from "@/components/shared/BottomBar";


const RootLayout = () => {


  return (
    <div className="w-full lg:flex">
      <TopBar />
      <LeftSideBar />


      <section className="flex w-full flex-1 overflow-x-hidden">
        <Outlet />
      </section>

      <BottomBar />
    </div>
  )
}

export default RootLayout