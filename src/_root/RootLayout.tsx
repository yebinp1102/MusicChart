import { Outlet } from "react-router-dom"
import TopBar from "@/components/shared/TopBar";


const RootLayout = () => {


  return (
    <div className="w-full md:flex">
      <TopBar />

      <section className="flex flex-1 h-full">
        {/* <Outlet /> */}
      </section>
    </div>
  )
}

export default RootLayout