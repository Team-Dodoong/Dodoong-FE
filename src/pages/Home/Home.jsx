import React from "react";
import * as S from "../Home/Home.style";

// 스타일 파일을 S로 임포트 해와 아래처럼 사용하면 편리합니다.
// 아이콘과 같은 요소는 피그마에서 svg로 export 하여 사용합니다.
// svg 파일은 assets 폴더에서 페이지별로 관리하면 좋습니다.

//피그마 dev 모드에서 CSS 클릭 후 단위는 px대신 rem으로 설정하여 사용하는 것을 권장합니다.
//모바일 UI이므로 고정 사이즈가 아니라 width:100%으로 두고, margin, padding 등으로 조절하는 것이 좋습니다!

//폴더 구조:
// Common에는 전역적으로 사용되는 공통 요소, 이후 각 페이지 등 큰 단위로 폴더를 만들어 관리하면 깔끔합니다.
//하지만 폴더 구조 설계에는 정답은 없으므로 팀원과 협의하여 가장 편한 방식으로 정하면 됩니다!

//주석 및 제가 작성해놓은 코드들은 임의로 작성한 것이므로 확인 후 모두 삭제하여도 됩니다~

export default function Home() {
  return (
    <S.Container>
      <div>Home</div>
      <br />
      <div>
        color는 styles/Colors.css 파일에 :root에서 등록하여 사용하면 편리합니다.
        <br />
        피그마에서 디자이너님의 color system 보고 등록해서 사용하세요! <br />
        <br />
        -사용 시 var(--Gray_1), var(--Main) 처럼 사용
      </div>
    </S.Container>
  );
}
