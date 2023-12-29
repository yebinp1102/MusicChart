import { Models } from "appwrite"
import { Button } from "../ui/button"

type Props = {
  song?: Models.Document

}

const HomeBanner = ({song}: Props) => {
  return (
    <div className="absolute bg-orange-50 h-full w-full -z-10">

      {/* img */}
      <div className="absolute w-full h-full">
        <img src={`/assets/images/banner01.gif`} className="w-full h-full object-center object-cover absolute"/>
        <div className="w-full h-full bg-black absolute opacity-30"></div> 
        <div className="absolute w-full h-full bg-linear-gradient"></div>
        <div className="absolute w-full h-full bg-gradient-to-t from-black to-transparent"></div>
      </div>

    </div>
  )
}

export default HomeBanner