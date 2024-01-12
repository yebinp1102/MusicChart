import React from "react"

type Props = {
  searchValue: string,
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInput = ({searchValue, setSearchValue} : Props) => {

  return (
    <div className="relative flex items-center text-[0.9rem] w-[500px]">
      <input
        type="text"
        placeholder="찾는 곡의 이름을 입력해주세요."
        className="shad-input_search"
        value={searchValue}
        onChange={(e) => {setSearchValue(e.target.value)}}
      />
      <img
        src="/assets/icons/search.svg"
        alt="search-icon"
        className="absolute right-[12px] top-0"
      />
    </div>
  )
}

export default SearchInput