import { Outlet } from "react-router-dom"
import TopBar from "@/components/shared/TopBar";
import LeftSideBar from "@/components/shared/LeftSideBar";
import BottomBar from "@/components/shared/BottomBar";
import AudioPlayer from "@/components/audio/AudioPlayer";


const RootLayout = () => {


  return (
    <div className="w-screen lg:flex overflow-x-hidden relative">
      <TopBar />
      <LeftSideBar />


      <section className="flex flex-col w-full h-100vh flex-1 overflow-x-hidden">
        <Outlet />
      </section>

      <div className="flex flex-col w-full lg:sm-screen-width fixed z-[100] bottom-0 lg:right-0 ">
        <AudioPlayer />
        <BottomBar />
      </div>
    </div>
  )
}

export default RootLayout