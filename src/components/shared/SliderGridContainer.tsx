import { useNavigate } from "react-router-dom";

type Props = {
  contents: ContentType[]
}

type ContentType = {
  title?: string;
  subText?: string;
  bgColor?: string;
  link?: string;
  contentImg?: string;
}

const SliderGridContainer = ({contents} : Props) => {
  const navigate = useNavigate();
  return (
    <div className="w-[650px] h-full flex-shrink-0 border-2 border-gray-600 rounded-lg p-4 shadow-xl">

      <div className="grid_slider">
        {contents.map(content => (
          <div className={`grid_item  cursor-pointer ${content.bgColor}`} onClick={() => navigate(`${content.link}`)}>
            {content.title ? (
              <div className="p-5">
                <div className="opacity-50 mb-2 flex">Music Chart</div>
                <h2 className="h2-bold">{content.title}</h2>
                <div className="opacity-80 leading-tight mt-1">{content.subText}</div>
              </div>
            ) : (
              <img 
                src={`${content.contentImg}`}
                alt="track_cover_art"
                className="w-[220px] h-[220px] object-cover"
              />
            )}

          </div>
        ))}
      </div>
      
    </div>
  )
}

export default SliderGridContainer