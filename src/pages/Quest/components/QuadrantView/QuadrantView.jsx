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
  const [selectedQuadrant, setSelectedQuadrant] = useState(null);

  return (
    <S.Container>
      <S.Grid>
        {QUADRANTS.map((q) => (
          <S.Card key={q.id} onClick={() => setSelectedQuadrant(q)}>
            <S.Badge $bgColor={q.bgColor} $color={q.color}>
              {q.title}
            </S.Badge>
            <S.ItemList>
              {(mockData[q.id] || []).slice(0, 6).map((item) => (
                <S.Item key={item.id}>
                  <S.Checkbox type="checkbox" readOnly checked={item.completed} />
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
          items={mockData[selectedQuadrant.id] || []}
          onClose={() => setSelectedQuadrant(null)}
        />
      )}
    </S.Container>
  );
}

export default QuadrantView;