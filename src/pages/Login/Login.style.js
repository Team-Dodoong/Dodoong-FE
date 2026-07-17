import styled from 'styled-components';


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh; /* min-height → height로 고정 */
  background-color: var(--White, #ffffff);
  box-sizing: border-box;
  position: relative;
  overflow: hidden; /* 이중 높이로 인한 스크롤 방지 */
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1; 
  min-height: 0; 
  justify-content: flex-start;
  align-items: stretch; 
  box-sizing: border-box;
  padding: 0 20px;
`;

export const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
`;

/* ================= STEP -1 Styles (로그인 화면 전용) ================= */
export const LoginHeaderSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 13.7813rem;
  margin-bottom: 3.25rem;
`;

export const LoginFormSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem; /* 인풋창들과 하단 로그인 버튼 사이의 간격 */
`;



/* ================= STEP 0 Styles ================= */
// STEP 0 메인 진입 화면 전체 Wrapper
export const StepZeroWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%; 
  box-sizing: border-box;
`;

export const LogoSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 52px; 
`;

export const LogoText = styled.h1`
  font-family: "Jalnan2";
  font-size: 40px;
  font-weight: 400;
  line-height : 28px;
  color: #FF974D;
  word-wrap: break-word;
  margin: 0;
`;

export const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: .5rem; 

`; 

export const ErrorMessage = styled.span`
  font-size: 12px;
  color: #ff3b30;
  margin-top: 6px;
`;
