import { useNavigate } from "react-router-dom";

type Props = {
  title?: string;
  subText?: string;
  coverArtScr?: string;
  bgColor?: string;
  link?: string;
}


const SongInfoCard = ({title, subText, coverArtScr, bgColor, link} : Props) => {
  const navigate = useNavigate();
  return (
    <div className="songInfo_container">
      {coverArtScr ? (
        <>
          <img 
            src={coverArtScr ? `${coverArtScr}` : '/assets/images/cover-art01.jpg'}
            alt="song_info_card_cover_art"
            className="songInfo_card_bg"
          />
          <div className="songInfo_card_box songInfo_card_hover">
            <img 
              src="/assets/icons/like.svg"
            />
            <img 
              src="/assets/icons/play-btn.svg"
            />
            <img 
              src="/assets/icons/add-song.svg"
            />
          </div>
          <p className="font-bold">{title}</p>
          <p className="text-sm text-light-3">{subText}</p>
        </>
      ): (
        <>
          <div className={`songInfo_card_bg ${bgColor}`}></div>
          <div className="songInfo_card_box p-3 cursor-pointer" onClick={() => navigate(`${link}`)}>
            <div className="opacity-50 text-sm mb-2 flex">Music Chart</div>
            <div className="h4-bold">{title}</div>
            <div className="opacity-80 leading-tight mt-1">{subText}</div>
          </div>
          <p className="font-bold">{title}</p>
        </>
      )}
    </div>
  )
}

export default SongInfoCard