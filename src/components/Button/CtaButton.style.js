import styled from 'styled-components';

// 1. 최외곽 컨테이너 (피그마-StyledBackground)
export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 100%;

  margin-top: 0; 
  padding: 0;

  // Bottom 상태 (variant="bottom"일 때)
  ${props => props.$variant === 'bottom' && `
    position: absolute;         
    bottom: 0;                  /* 바닥에 밀착 */
    left: 0;                    /* 부모 박스의 왼쪽 끝에 맞춤 */
    width: 100%;                /* 부모 박스 너비 안에서만 100%*/
    /* 회색 테두리 선을 벗어나지 않도록 앱 전체 가로폭과 일치. */
    max-width: 30rem;           
    
    height: 7.4375rem;          
    background: var(--White);
    box-shadow: 0rem -0.125rem 0.3125rem rgba(0, 0, 0, 0.05); 
    
    /* 위(12px) 좌우(20px) 아래는 나머지 공간 자동 확보 */
    padding: 0.75rem 1.25rem 0 1.25rem; 
    align-items: flex-start;    /* 버튼이 흰색 판 위쪽(top:12px 지점)에 매달려 있게 설정 */
    z-index: 1000;
  `}
`; 

 
// 2. 공통 검은색 라운드 버튼 (피그마의 StyledBtt 역할)
export const BlackButton = styled.button`
  width: 100%;                  /* 부모 컨테이너 패딩(좌우 20px)을 제외하고 꽉 차게 조절 (자동으로 335px이 됨) */
  max-width: none;         
  height: 3.1875rem;            
  padding: 0.5rem;              
  
  background: var(--Black);
  border-radius: 8px;           
  cursor: pointer;

  // 내부 텍스트 정렬
  display: inline-flex;
  justify-content: center; 
  align-items: center;                  

  // 3️⃣ 텍스트 스타일 
  color: var(--White);
  font-size: 1rem;             
  font-family: "Pretendard Variable";
  font-weight: 600;             
  word-wrap: break-word;

  /* 💡 variant가 secondary(회원가입용)일 때와 아닐 때(기존 검은색 스타일) 분기 처리 */
  background: ${props => props.$variant === 'secondary' ? 'var(--White)' : 'var(--Black)'};
  color: ${props => props.$variant === 'secondary' ? 'var(--Gray_6)' : 'var(--White)'};
  border: ${props => props.$variant === 'secondary' ? '1px solid var(--Gray_2)' : 'none'};

  &:disabled {
    background: var(--Gray_2);
    color: var(--Gray_4);
    border: none;
    cursor: not-allowed;
    opacity: 1;
  }


`; 
