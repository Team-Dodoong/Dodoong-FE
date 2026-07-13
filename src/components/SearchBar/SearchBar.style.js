import styled from "styled-components";

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  height: 2.75rem;
  padding: 0 1rem;
  background: #f5f5f5;
  border-radius: 999px;
`;

export const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 0.875rem;
  color: #333;

  &::placeholder {
    color: #aaaaaa;
  }
`;
