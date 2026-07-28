import React, { useState } from 'react';
import * as S from './YearMonthPicker.style';

function YearMonthPicker({ currentYear, currentMonth, onChange }) {
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [isMonthOpen, setIsMonthOpen] = useState(false);

  const years = Array.from({ length: 7 }, (_, i) => 2026 - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <S.PickerContainer>
      <S.DropdownWrapper>
        <S.SelectButton onClick={() => { setIsYearOpen(!isYearOpen); setIsMonthOpen(false); }}>
          {currentYear} <span>▼</span>
        </S.SelectButton>
        <S.Label>년</S.Label>

        {isYearOpen && (
          <S.DropdownList>
            {years.map((y) => (
              <S.DropdownItem
                key={y}
                $isSelected={y === currentYear}
                onClick={() => {
                  onChange(y, currentMonth);
                  setIsYearOpen(false);
                }}
              >
                {y} {y === currentYear && '✓'}
              </S.DropdownItem>
            ))}
          </S.DropdownList>
        )}
      </S.DropdownWrapper>

      <S.DropdownWrapper>
        <S.SelectButton onClick={() => { setIsMonthOpen(!isMonthOpen); setIsYearOpen(false); }}>
          {currentMonth} <span>▼</span>
        </S.SelectButton>
        <S.Label>월</S.Label>

        {isMonthOpen && (
          <S.DropdownList>
            {months.map((m) => (
              <S.DropdownItem
                key={m}
                $isSelected={m === currentMonth}
                onClick={() => {
                  onChange(currentYear, m);
                  setIsMonthOpen(false);
                }}
              >
                {m} {m === currentMonth && '✓'}
              </S.DropdownItem>
            ))}
          </S.DropdownList>
        )}
      </S.DropdownWrapper>
    </S.PickerContainer>
  );
}

export default YearMonthPicker;