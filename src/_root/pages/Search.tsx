import Loader from "@/components/shared/Loader"
import SearchInput from "@/components/shared/SearchInput"
import SongList from "@/components/shared/SongList"
import useDebounce from "@/hooks/useDebounce"
import { useSearchSongs } from "@/lib/react-query/queries"
import { useState } from "react"

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);
  const {data: searchSongs, isFetching: isSearchFeteching} = useSearchSongs(debouncedSearch);

  return (
    <div className="flex-full-screen">

      {/* Top - Search bar */}
      <div className="gradient-primary-full relative">
        <div className="bg-black-opacity"></div>
        <div className="max-w-6xl mx-auto relative px-[2rem]">
          <div className="w-full h-[400px] flex justify-center flex-col">
            <h1 className="text-white text-[2rem] mb-10">찾는 곡이 있으신가요?</h1>
            <SearchInput searchValue={searchValue} setSearchValue={setSearchValue} />
          </div>
        </div>
      </div>


      {/* Bottom - Search results */}
      <div className="w-full h-full">
        <div className="max-w-[70rem] mx-auto h-full">
          {!searchSongs && !debouncedSearch && (
            <div className="h-full flex items-center justify-center">입력창에 찾는 곡의 정보를 입력해주세요.</div>
          )}
          {searchSongs?.documents.length === 0 ? (
            <div className="h-full flex items-center justify-center">죄송합니다. 일치하는 곡을 찾지 못했습니다.</div>
          ): isSearchFeteching ? (
            <div className="h-full flex items-center justify-center">
              <div><Loader /></div>
              <p className="ml-10">곡을 불러오는 중입니다.</p>
            </div>
          ): (
            <div className="flex flex-col h-full justify-between px-[1.5rem]">
              <div className="flex flex-col">
                {searchSongs?.documents.map((song) => (
                  <SongList song={song} key={song.$id} />
                ))}
              </div>
              <div className="w-full pb-6 flex items-center justify-center gap-8">
                <img src="public/assets/icons/arrowLeft.svg" className="border border-primary-500 rounded-[50%] cursor-pointer" width={45} />
                <img src="public/assets/icons/arrowRight.svg" className="border border-primary-500 rounded-[50%] cursor-pointer" width={45} />
              </div>
            </div>
          )}
        </div>
        
        
      </div>
    </div>
  )
}

export default Search