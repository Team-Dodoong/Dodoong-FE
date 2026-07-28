import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: 100vh;
  max-width: 480px;
  margin: 0 auto;
  background-color: var(--White);
  padding-bottom: 100px; /* 하단 고정 BottomCta 영역 확보 */
`;

export const TopBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px #F1F1F1 solid;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
`;

export const TopTitle = styled.h1`
  font-size: 17px;
  font-weight: 700;
  color: #1A1A1A;
`;

export const SaveButton = styled.button`
  font-size: 15px;
  font-weight: 500;
  color: #FF9142;
  font-weight: 700;
`;

export const Section = styled.section`
  padding: 20px 20px 24px;
`;

export const SectionLabel = styled.h2`
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #1A1A1A;
`;

export const TextareaWrapper = styled.div`
  position: relative;
`;


