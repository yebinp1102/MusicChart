{/* 곡 정보 - hover 하면 1. 좋아요/재생/플리+ 버튼 보이게  2. 해당 컨테이너 scale 1.1 */}

const SongInfoCard = () => {
  return (
    <div className="songInfo_container">

      <img 
        src="/assets/images/cover-art01.jpg" 
        alt="song_info_card_cover_art"
        className="songInfo_card_img"
      />

      <div className="songInfo_card_hover">
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

      <p className="font-bold">Song title</p>
      <p className="text-sm text-light-3">Song singer</p>
    </div>
  )
}

export default SongInfoCard