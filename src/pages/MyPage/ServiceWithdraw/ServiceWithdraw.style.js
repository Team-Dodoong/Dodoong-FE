import styled from 'styled-components';
import Back from '../../../assets/ic_back_24.svg?react';
import Check from '../../../assets/ic_regular_check_24.svg?react';



export const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 480px;
  min-height: 100vh;
  margin: 0 auto;
  // padding-bottom: 100px;
  background: #ffffff;
  font-family: "pretendard";
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  position: relative;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px #F1F1F1 solid;
`;

export const BackButton = styled(Back)`
  color: var(--Gray_5);
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  left: 20px;
  background: none;
`;

export const HeaderTitle = styled.h1`
  font-size: 18px;
  font-weight: 700;
  color: #111111;
`;

export const Content = styled.div`
  padding: 32px 20px 24px 20px;
`;

export const MainTitle = styled.h2`
  margin-bottom: 24px;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.4;
  color: #111111;
`;

export const NoticeList = styled.ul`
  margin-bottom: 28px;
  padding-left: 14px;
`;

export const NoticeItem = styled.li`
  margin-bottom: 12px;
  list-style-type: disc;
  font-size: 14px;
  line-height: 1.6;
  color: #666666;
`;

export const PointHighlight = styled.div`
  margin-bottom: 6px;
  font-size: 16px;
  font-weight: 700;
  color: #111111;
`;

export const PointLink = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: #999999;
  cursor: pointer;
`;

export const CheckboxSection = styled.div`
  flex: 1; 
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px 20px;
  background-color: #F5F5F5; /* 왼쪽과 동일한 연한 회색으로 미세 조정 */

`;

export const CheckboxRow = styled.div`
  display: flex;
  gap: 12px;
  cursor: pointer;
`;

export const CheckCircle = styled.div`
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  /* 활성화되면 지정 색상/오렌지색, 비활성화면 투명/흰색 배경 */
  background-color: ${(props) => (props.active ? props.color || '#E87C38' : 'transparent')};
  border: 1px solid ${(props) => (props.active ? props.color || '#E87C38' : '#CCCCCC')};
  border-radius: 50%;
  color: #ffffff;
  font-size: 11px;
`;

export const CheckIcon = styled(Check)`
  color: var(--White);
  width: .625rem;
  height: .625rem;
  // position: absolute;
  // left: 20px;
  background: none;
`;

export const CheckboxLabel = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
  color: #444444;
`;


/* export const SubmitButton = styled.button`
  position: absolute;
  bottom: 24px;
  left: 20px;
  right: 20px;
  height: 52px;
  background-color: ${(props) => (props.disabled ? '#cccccc' : '#000000')};
  border: none;
  border-radius: 8px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`; */