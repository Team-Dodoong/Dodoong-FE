import { motion, useAnimation } from 'framer-motion';
import { useState } from 'react';

import QuestList from '../QuestList/QuestList'
import QuestTabs from '../QuestTabs/QuestTabs'

import * as S from './BottomSheet.style';


/**
 * 홈 화면 하단의 퀘스트 목록 바텀시트
 * - 펼침/접힘 상태와 드래그 애니메이션을 자체적으로 관리
 * - 퀘스트 데이터/핸들러는 상위(Home)에서 props로 전달받음
 */
function BottomSheet({
  activeTab,
  onTabChange,
  quests,
  onToggle,
  onEdit,
  onPostpone,
  onDeleteToday,
  onDeleteForever,
  onLeaveParty,
  onSuccess,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const controls = useAnimation();

  // 바텀시트 열고 닫는 함수
  const toggleBottomSheet = (expand) => {
    const targetExpanded = expand !== undefined ? expand : !isExpanded;
    setIsExpanded(targetExpanded);

    // -380px 위치(최대 높이) 또는 0px(원래 위치)로 애니메이션 이동
    controls.start({
      y: targetExpanded ? -380 : 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    });
  };

  // 드래그가 끝났을 때 어느 위치에 가까운지 판단해서 착 붙게(Snap) 만듦
  const handleDragEnd = (_, info) => {
    // 위로 일정 거리 이상 끌었거나 위쪽으로 빠르게 드래그했을 때 -> 펼침
    if (info.offset.y < -100 || info.velocity.y < -500) {
      toggleBottomSheet(true);
    }
    // 아래로 일정 거리 이상 끌었거나 아래쪽으로 빠르게 드래그했을 때 -> 접음
    else if (info.offset.y > 100 || info.velocity.y > 500) {
      toggleBottomSheet(false);
    }
    // 애매하게 움직인 경우 현재 상태 유지
    else {
      toggleBottomSheet(isExpanded);
    }
  };

  return (
    <S.BottomSheetContainer
      as={motion.div}
      drag="y"
      animate={controls} // controls를 통한 위치 제어
      dragConstraints={{ top: -380, bottom: 0 }} // 상단으로 올라갈 수 있는 한계치
      dragElastic={0.1} // 경계에서 살짝 튕기는 드래그 감도
      onDragEnd={handleDragEnd} // 드래그 놓았을 때 착 붙는 로직
    >
      <QuestTabs
        activeTab={activeTab}
        onChange={onTabChange}
        onToggleExpand={() => toggleBottomSheet()}
      />

      <S.BottomSheetScrollArea>
        <QuestList
          quests={quests}
          type={activeTab}
          onToggle={onToggle}
          onEdit={onEdit}
          onPostpone={onPostpone}
          onDeleteToday={onDeleteToday}
          onDeleteForever={onDeleteForever}
          onLeaveParty={onLeaveParty}
          onSuccess={onSuccess}
        />
      </S.BottomSheetScrollArea>
    </S.BottomSheetContainer>
  );
}

export default BottomSheet;
