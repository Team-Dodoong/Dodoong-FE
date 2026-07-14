import styled from "styled-components";
import Search from "../../assets/ic_search_24.svg?react";
import { Regular_14 } from "../../styles/Fonts";

export const SearchWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 41px;
  padding: 0.75rem 1.25rem;
  background: var() (--Gray_0);
  border-radius: 2.5rem;
`;

export const Input = styled.input`
  ${Regular_12};
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: var(--Black);

  &::placeholder {
    color: var(--Gray_5);
  }
`;

export const SearchIcon = styled(Search)`
  width: 1.0625rem;
  height: 1.0625rem;
  color: #616161;
`;
