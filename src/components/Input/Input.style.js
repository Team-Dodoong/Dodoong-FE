import styled from 'styled-components';
import Eye from '../../assets/ic_eye_24.svg?react';
import EyeOff from '../../assets/ic_eye-off_24.svg?react';

export const EyeIcon = styled(Eye)`
  width: 1.25rem;   /* 24px */
  height: 1.25rem;
  color: var(--Gray_5); 
`;

export const EyeOffIcon = styled(EyeOff)`
  width: 1.25rem;
  height: 1.25rem;
  color: var(--Gray_5); 
`;

// 피그마의 StyledInputSection 참고 (가장 바깥쪽 감싸는 상자)
export const InputContainer = styled.div`
  width: 100%;
  max-width: 30rem; 
  height: ${(props) => props.$height || '52px'};
  flex-shrink: 0; 
  padding: 1rem 1rem; 
  background: white;
  border-radius: 4px;
  border: 1px solid #E8E8E8;
  display: inline-flex;
  align-items: ${(props) => props.$height ? 'flex-start' : 'center'}; /* 💡 높이가 클 때는 정렬을 위로 맞춥니다 */
  justify-content: flex-start;
  gap: 0.5rem;
  position: relative;
  box-sizing: border-box;

  margin-top: ${(props) => props.$marginTop || '0px'};
`;

// 피그마의 StyledTextareaspan 및 기능적 Input 스타일 융합
export const StyledInput = styled.input`
  flex: 1 1 0;
  border: none;
  outline: none;
  background: transparent;
  padding: 0;
  height: 100%;
  resize: none;
  
  /* 피그마 폰트 스타일 반영 */
  color: #A1A1A1; 
  font-size: 0.875rem; /* 14px */
  font-family: 'Pretendard';
  font-weight: 400;
  line-height: 19.60px;
  word-wrap: break-word; //강제 줄바꿈

  &::placeholder {
    color: #A1A1A1; 
  }
`; 


// 피그마의 StyledFrame(20x20)을 클릭 가능한 버튼 스타일로 변경
export const ToggleButton = styled.button`
  width: 18.75px; /* 20px */
  height: 18.75px;  /* 20px */
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  /* 버튼 클릭 시 브라우저 기본 파란 테두리 제거 */
  &:focus {
    outline: none;
  }

  /* 내부 아이콘(SVG나 이미지) 크기 제어 */
  img, svg {
    width: 100%;
    height: 100%;
    display: block;
  }
`; 

