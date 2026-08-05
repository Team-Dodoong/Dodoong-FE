import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as S from './QuadrantView.style';
import QuadrantModal from '../QuadrantModal/QuadrantModal';
import { getQuadrantQuests, toggleCheckDailyQuest } from '../../../../api/dailyQuestApi';

const QUADRANTS = [
  { id: 'q1', categoryKey: 'IMPORTANT_URGENT', title: '긴급한 일이에요!', bgColor: '#FF8A3D', color: '#FFFFFF' },
  { id: 'q2', categoryKey: 'IMPORTANT_NOT_URGENT', title: '중요한 일이에요!', bgColor: '#FFF6E5', color: '#FF8A3D' },
  { id: 'q3', categoryKey: 'NOT_IMPORTANT_URGENT', title: '미뤄도 괜찮아요!', bgColor: '#EFEFEF', color: '#888888' },
  { id: 'q4', categoryKey: 'NOT_IMPORTANT_NOT_URGENT', title: '긴급하지 않아요!', bgColor: '#EFEFEF', color: '#888888' },
];

function QuadrantView({ selectedDate, refreshTrigger }) {
  const location = useLocation();
  // 🟢 3. 기본 상태를 q1, q2, q3, q4 빈 배열로 초기화 (undefined 에러 방지)
  const [todoData, setTodoData] = useState({
    q1: [],
    q2: [],
    q3: [],
    q4: [],
  });
  const [selectedQuadrant, setSelectedQuadrant] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // 🟢 4. 사분면 데이터 API 조회
  useEffect(() => {
    const fetchQuadrants = async () => {
      setIsLoading(true);
      try {
        const response = await getQuadrantQuests();
        const quadrantList = response.data?.quadrants || [];

        const newTodoData = { q1: [], q2: [], q3: [], q4: [] };

        // 백엔드 카테고리 응답 데이터를 UI용 키(q1~q4)로 변환
        quadrantList.forEach((group) => {
          const matchedQuadrant = QUADRANTS.find((q) => q.categoryKey === group.category);
          if (matchedQuadrant) {
            newTodoData[matchedQuadrant.id] = (group.quests || []).map((quest) => {
              const isChecked = quest.isChecked ?? quest.completed ?? false;
              const contentText = quest.content || quest.title || '';
              
              return {
                id: quest.dailyQuestId || quest.id,
                dailyQuestId: quest.dailyQuestId || quest.id,
                title: contentText,
                content: contentText,
                completed: isChecked,
                isChecked: isChecked,
                isRoutine: quest.isRoutine,
              };
            });
          }
        });

        setTodoData(newTodoData);
      } catch (error) {
        console.error('사분면 데이터 조회 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuadrants();
  }, [location.key, refreshTrigger]);

  // 체크 토글 처리 (UI 선반영 + 서버 PATCH)
  const handleToggle = async (quadrantId, itemId) => {
    // 만약 모달 등에서 quadrantId 없이 itemId만 들어올 경우를 대비한 안전 장치
    let targetQuadId = quadrantId;
    if (!itemId) {
      itemId = quadrantId;
      // itemId만 들어온 경우 전체 사분면에서 해당 아이템을 검색
      targetQuadId = Object.keys(todoData).find((qKey) =>
        todoData[qKey].some((item) => item.id === itemId)
      );
    }

    if (!targetQuadId) return;

    const targetList = todoData[targetQuadId] || [];
    const targetItem = targetList.find((item) => item.id === itemId);
    if (!targetItem) return;

    const nextCompleted = !targetItem.completed;

    // UI 선반영
    setTodoData((prevData) => ({
      ...prevData,
      [quadrantId]: (prevData[targetQuadId] || []).map((item) =>
        item.id === itemId 
          ? { ...item, completed: nextCompleted, isChecked: nextCompleted }
          : item
      ),
    }));

    // API 호출
    try {
      await toggleCheckDailyQuest(itemId, nextCompleted);
    } catch (error) {
      // 실패 시 롤백
      setTodoData((prevData) => ({
        ...prevData,
        [targetQuadId]: (prevData[targetQuadId] || []).map((item) =>
          item.id === itemId 
            ? { ...item, completed: !nextCompleted, isChecked: !nextCompleted } 
            : item
        ),
      }));
      alert('상태 변경에 실패했습니다.');
    }
  };

  if (isLoading) {
    return <S.Container style={{ padding: '20px', textAlign: 'center' }}>로딩 중...</S.Container>;
  }

  return (
    <S.Container>
      <S.Grid>
        {QUADRANTS.map((q) => (
          <S.Card key={q.id} onClick={() => setSelectedQuadrant(q)}>
            <S.Badge $bgColor={q.bgColor} $color={q.color}>
              {q.title}
            </S.Badge>
            <S.ItemList>
              {(todoData[q.id] || []).slice(0, 6).map((item) => (
                <S.Item key={item.id}>
                  <S.Checkbox
                    type="checkbox"
                    checked={item.completed}
                    onClick={(e) => e.stopPropagation()}
                    onChange={() => handleToggle(q.id, item.id)}
                  />
                  <S.Title>{item.title}</S.Title>
                </S.Item>
              ))}
            </S.ItemList>
          </S.Card>
        ))}
      </S.Grid>

      {selectedQuadrant && (
        <QuadrantModal
          category={selectedQuadrant}
          items={todoData[selectedQuadrant.id] || []}
          onClose={() => setSelectedQuadrant(null)}
          // 모달에서 (quadrantId, itemId) 형태로 넘기거나 (itemId)만 넘겨도 모두 대응 가능
          onToggle={(catIdOrItemId, itemId) => {
            if (itemId) {
              handleToggle(catIdOrItemId, itemId);
            } else {
              handleToggle(selectedQuadrant.id, catIdOrItemId);
            }
          }}
        />
      )}
    </S.Container>
  );
}

export default QuadrantView;