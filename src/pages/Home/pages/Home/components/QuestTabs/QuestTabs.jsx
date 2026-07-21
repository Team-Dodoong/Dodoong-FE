import * as S from './QuestTabs.style';

// 일일퀘스트 / 파티퀘스트 전환 탭 (바텀시트 형태 상단 드래그 핸들 포함)
function QuestTabs({ activeTab, onChange }) {
  return (
    <S.Wrapper>
      <S.DragHandle />
      <S.TabRow>
        <S.Tab
          type="button"
          $active={activeTab === 'daily'}
          onClick={() => onChange('daily')}
        >
          일일퀘스트
        </S.Tab>
        <S.Tab
          type="button"
          $active={activeTab === 'party'}
          onClick={() => onChange('party')}
        >
          파티퀘스트
        </S.Tab>
      </S.TabRow>
    </S.Wrapper>
  );
}


export default QuestTabs;
