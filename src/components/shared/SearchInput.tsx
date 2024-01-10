import { useEffect, useState } from "react"

const SearchInput = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <div className="relative flex items-center text-[0.9rem] w-[300px]">
      <img
        src="/assets/icons/search.svg"
        alt="search-icon"
        className="absolute ml-3"
      />
      <input
        type="text"
        placeholder="Search"
        className="shad-input_search"
        value={searchValue}
        onChange={(e) => {setSearchValue(e.target.value)}}
      />
    </div>
  )
}

export default SearchInput