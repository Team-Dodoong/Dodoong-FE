import React, { useState } from 'react';
import * as S from './QuadrantView.style';
import QuadrantModal from '../QuadrantModal/QuadrantModal';


const QUADRANTS = [
  { id: 'q1', title: '긴급한 일이에요!', bgColor: '#FF8A3D', color: '#FFFFFF' },
  { id: 'q2', title: '중요한 일이에요!', bgColor: '#FFF6E5', color: '#FF8A3D' },
  { id: 'q3', title: '미뤄도 괜찮아요!', bgColor: '#EFEFEF', color: '#888888' },
  { id: 'q4', title: '긴급하지 않아요!', bgColor: '#EFEFEF', color: '#888888' },
];

function QuadrantView({ mockData }) {
  // 1. mockData를 받아와서 상태로 관리합니다.
  const [todoData, setTodoData] = useState(mockData);
  const [selectedQuadrant, setSelectedQuadrant] = useState(null);

  // 2. 사분할 ID(quadrantId)와 아이템 ID(itemId)를 받아 completed 상태를 반전시키는 함수
  const handleToggle = (quadrantId, itemId) => {
    setTodoData((prevData) => ({
      ...prevData,
      [quadrantId]: (prevData[quadrantId] || []).map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      ),
    }));
  };

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
          onToggle={handleToggle} // 체크 토글 함수 전달
        />
      )}
    </S.Container>
  );
}

export default QuadrantView;