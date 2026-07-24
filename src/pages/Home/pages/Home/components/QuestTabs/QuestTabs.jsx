import * as S from './QuestTabs.style';

// 일일퀘스트 / 파티퀘스트 전환 탭 (바텀시트 형태 상단 드래그 핸들 포함)
function QuestTabs({ activeTab, onChange, onToggleExpand }) {
  // 탭 클릭 시 이벤트가 부모 영역으로 전파되지 않도록 막아줍니다.
  const handleTabClick = (e, tabName) => {
    e.stopPropagation(); 
    onChange(tabName);
  };
  
  return (
    <S.Wrapper>
      {/* 🔽 상단 회색 드래그 핸들 영역을 터치/클릭했을 때만 바텀시트 동작 */}
      <S.HandleArea onClick={onToggleExpand}>
        <S.DragHandle />
      </S.HandleArea>

      <S.TabRow>
        <S.Tab
          type="button"
          $active={activeTab === 'daily'}
          onClick={(e) => handleTabClick(e,'daily')}
        >
          일일퀘스트
        </S.Tab>
        <S.Tab
          type="button"
          $active={activeTab === 'party'}
          onClick={(e) => handleTabClick(e,'party')}
        >
          파티퀘스트
        </S.Tab>
      </S.TabRow>
    </S.Wrapper>
  );
}


export default QuestTabs;
