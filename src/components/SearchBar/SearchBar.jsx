import * as S from "./SearchBar.style";

function SearchBar({ placeholder }) {
  return (
    <S.SearchWrapper>
      <S.Input placeholder={placeholder} />
      <S.SearchIcon />
    </S.SearchWrapper>
  );
}

export default SearchBar;
