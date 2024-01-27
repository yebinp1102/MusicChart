
type Props = {
  title?: string;
  subText?: string;
  coverArtScr?: string;
  bgColor?: string;
}


const SongInfoCard = ({title, subText, coverArtScr, bgColor} : Props) => {
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
          <div className="songInfo_card_box p-4">
            <div className="opacity-50 text-sm mb-2 flex">Music Chart</div>
            <div className="h3-bold">{title}</div>
            <div className="opacity-80 leading-tight mt-1">{subText}</div>
          </div>
          <p className="font-bold">{title}</p>
        </>
      )}
    </div>
  )
}

export default SongInfoCard