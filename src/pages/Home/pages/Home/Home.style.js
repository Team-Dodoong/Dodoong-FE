import styled from 'styled-components';


 /* export const Wrapper = styled.div`
  position: relative;
  height: 100vh;
  max-width: 480px;
  width: 100%;
  padding-top: 12px;
  margin: 0 auto;
  overflow: hidden; // BottomNav 높이만큼 확보 
`;  */

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #ffffff;
`;


// 💡 Header 밑에 위치하며, 배경 이미지를 꽉 채워주는 메인 컨테이너
export const Content = styled.main`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 20px 120px; /* 아래쪽 바텀시트에 가려지지 않게 여백 지정 */

  /* 🖼️ 전달받은 배경 이미지를 헤더 밑 영역 전체에 적용 */
  background-image: url(${props => props.$bgImage});
  background-size: 100% auto;;
  background-position: top center;
  background-repeat: no-repeat;
`;


// export const BottomSheetContainer = styled.div`
  // position: absolute;
  // left: 0;
  // right: 0;
  // top: 580px; /* 초기 위치 (캐릭터 아래쪽) - 화면 디자인데 맞게 조정 가능 */
  // height: calc(100vh - 120px); /* 끌어올렸을 때 헤더 제외 전체를 채울 높이 */
  // background-color: #ffffff;
  // border-radius: 24px 24px 0 0;
  // box-shadow: 0 -6px 16px rgba(0, 0, 0, 0.08);
  // z-index: 50; /* 헤더 및 기타 요소 아래, 콘텐츠 위에 위치 */
  // touch-action: none; /* 드래그 동작 시 브라우저 스크롤 중복 방지 */ 
// `;  

// export const BottomSheetScrollArea = styled.div`
  // height: calc(100% - 70px);
  // overflow-y: auto; /* 퀘스트 목록이 길어지면 내부에서 스크롤되도록 */
  // padding: 0 16px 100px; /* 바텀바에 가려지지 않게 여백 추가 */
// `; 

