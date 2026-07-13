import * as S from "./SearchBar.style";
import SearchIcon from "../../assets/ic_search_24.svg?react";

function SearchBar({ placeholder }) {
  return (
    <S.SearchWrapper>
      <S.Input placeholder={placeholder} />
      <SearchIcon width={20} height={20} />
    </S.SearchWrapper>
  );
}

export default SearchBar;
