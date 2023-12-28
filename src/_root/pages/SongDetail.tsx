import Likes from "@/components/shared/Likes";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useGetRecentSongs, useGetSongDetail } from "@/lib/react-query/queries";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const SongDetail = () => {
  const { id } = useParams();
  const { data: song, isPending: isGettingDetail } = useGetSongDetail(id);
  const [windowSize, setWindowSize] = useState<number | undefined>(undefined);
  const { data: songs, isPending: isSongLoading } = useGetRecentSongs();
  const {user} = useUserContext();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowSize(window.innerWidth);
      };
      window.addEventListener("resize", handleResize);
      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    } else {
      return () =>
        window.removeEventListener("resize", () => {
          return null;
        });
    }
  }, []);

  if (!song || isSongLoading) return <Loader />;

  return (
    <div className="w-full h-screen">
      {/* 상단 : 곡 정보 */}
      <div className="w-full lg:h-[50%] relative">
        {/* 뒷배경 그라데이션 */}
        <div className="detail_banner_background w-full h-full absolute -z-10"></div>
        <div className="w-full h-full bg-black opacity-50 absolute top-0 -z-10"></div>

        <div className="flex items-center h-full py-24">
          {/* 곡 세부 정보 & 앨범 커버 사진 */}
          <div className={`max-w-6xl mx-auto flex lg:flex-row flex-row-reverse justify-evenly lg:gap-32 gap-5 lg:p-8`}>
            {/* 곡 세부 정보 */}
            <div className="flex flex-col justify-center lg:px-5 px-1">
              {/* introduction */}
              <div>
                <p className="lg:h2-bold h3-bold mb-3">{song?.title}</p>
                <p className="text-light-3">{song?.singer}</p>
              </div>

              {/* button */}
              <div className="flex flex-col lg:mt-12 mt-10">
                <Likes song={song} userId={user.id} />
                <div className="flex gap-3 mt-5 items-center">
                  <Button className="shad-button_primary flex items-center lg:py-3 py-2 lg:px-10 px-8">
                    <p className="pb-0.5 font-thin">재생</p>
                    <img
                      src="/assets/icons/play-btn.svg"
                      width={20}
                      height={20}
                    />
                  </Button>
                  <Button
                    variant="outline"
                    className="shad-button_primary_outline lg:py-4 lg:px-6 py-3 px-5 font-thin"
                  >
                    리스트에 추가하기
                  </Button>
                </div>
              
              </div>
            </div>

            {/* 이미지 */}
            <div className="relative flex justify-end">
              <img
                src="/assets/icons/LP.svg"
                alt="loader"
                className={`w-[300px] h-[300px] lg:absolute mr-28 -top-3 ${windowSize < 1028 && 'hidden'}`}
              />
              <img
                src={song.imageUrl}
                className="lg:w-[270px] lg:h-[270px] w-[200px] h-[200px] relative"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 하단 : 유사 곡 & 가수의 다른 곡 */}
      <div className="w-full h-[50%]">
        {/* 유사곡 */}
        <div className="flex flex-col lg:max-w-6xl lg:mx-auto h-full justify-center lg:pb-16">
          <p className="mb-10 lg:mt-0 mt-10 text-center lg:text-left text-[20px] font-bold tracking-wide px-3">
            유사한 추천 곡
          </p>
          {windowSize > 1024 ? (
            <ul className="flex gap-8">
              {songs?.documents.slice(0, 5).map((song) => (
                <li key={song.$id} className="glass-box">
                  <Link to={`/song/detail/${song.$id}`}>
                    <img
                      className="lg:p-4 pb-0"
                      src={song.imageUrl}
                      alt={song.title}
                    />
                    <div className="text-center pb-5">
                      <p className="lg:text-sm">
                        {song.title}
                      </p>
                      <p className="text-xs text-light-3 mt-2">{song.singer}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="grid grid-3 gap-8 max-w-[600px] mx-auto">
              {songs?.documents.slice(0,6).map((song) => (
                <Link to={`/song/detail/${song.$id}`} className="glass-box overflow-hidden">
                  <li className="flex flex-col items-center">
                    <img className="sm:w-[160px] sm:h-[160px] w-[140px] h-[140px] object-contain" src={song.imageUrl} alt={song.title} />
                    <div className="text-center text-light-3 py-3">
                      <p className="text-sm">{song.title}</p>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SongDetail;


// songs?.documents.slice(0, 6).map