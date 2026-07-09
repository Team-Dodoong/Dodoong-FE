//style 파일 예시
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--main); //index.css의 :root 내부에 자주 쓰는 컬러 추가 후 사용
  position: relative;
  min-height: 100%;
`;


