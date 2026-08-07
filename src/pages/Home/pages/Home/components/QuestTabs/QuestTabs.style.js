import styled from "styled-components";

export const Wrapper = styled.section`
  width: 100%;
  // padding-top: 12px;
  // border-radius: 24px 24px 0 0;
  // background-color: var(--White);
  // box-shadow: 0 -6px 16px rgba(0, 0, 0, 0.04);
`;

// 🔽 터치나 클릭이 잘 먹히도록 넓힌 드래그 바 클릭 영역
export const HandleArea = styled.div`
  width: 100%;
  padding: 12px 0 0px;
  touch-action: none;
`;

export const DragHandle = styled.span`
  display: block;
  width: 36px;
  height: 4px;
  margin: 10px auto 0;
  border-radius: 999px;
  background-color: #e5e5ea;
`;

export const TabRow = styled.div`
  display: flex;
  margin-top: 4px;
  border-bottom: 1px solid #e5e5ea;
`;

export const Tab = styled.button`
  flex: 1;
  padding: 14px 0;
  font-size: 1rem;
  font-weight: 600;

  color: ${({ $active }) => ($active ? "#1A1A1A" : "#C7C7CC")};
  border-bottom: 2px solid
    ${({ $active }) => ($active ? "#FF9142" : "transparent")};
`;
