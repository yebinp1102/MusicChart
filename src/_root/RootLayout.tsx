import { Outlet } from "react-router-dom"
import TopBar from "@/components/shared/TopBar";
import LeftSideBar from "@/components/shared/LeftSideBar";
import BottomBar from "@/components/shared/BottomBar";
import AudioPlayer from "@/components/audio/AudioPlayer";


const RootLayout = () => {


  return (
    <div className="w-full lg:flex">
      <TopBar />
      <LeftSideBar />


      <section className="flex flex-col w-full flex-1 overflow-x-hidden">
        <Outlet />
        <AudioPlayer />
      </section>

      <BottomBar />
    </div>
  )
}

export default RootLayout