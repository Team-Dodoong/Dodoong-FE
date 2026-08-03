import * as S from "./SearchBar.style";

function SearchBar({ placeholder, value, onChange, onKeyDown }) {
  return (
    <S.SearchWrapper>
      <S.Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <S.SearchIcon />
    </S.SearchWrapper>
  );
}

export default SearchBar;
