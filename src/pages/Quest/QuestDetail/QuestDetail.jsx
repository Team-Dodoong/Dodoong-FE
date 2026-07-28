import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BackIcon from '../../../assets/ic_back_24.svg?react';
// import EyeOffIcon from '../../../../assets/ic_eye-off_24.svg?react';


import CategorySelector from './components/CategorySelector';
import CtaButton from "../../../components/Button/CtaButton";
import Input from "../../../components/Input/Input"
import * as S from './QuestDetail.style';

// [추가] 요일 목록 데이터
const DAYS = ['월', '화', '수', '목', '금', '토', '일'];

// 퀘스트 상세보기 / 수정 페이지
function QuestDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isNew = !id || id === 'new';

  const [content, setContent] = useState('');
  const [category, setCategory] = useState('urgent');
  const [isVisible, setIsVisible] = useState(true);

  //반복 설정 관련 상태
  const [isRepeating, setIsRepeating] = useState(true);
  const [selectedDays, setSelectedDays] = useState(['월', '화', '수', '목', '금']);
  const [endDate, setEndDate] = useState('2026.01.01');

  // 요일 선택/해제 핸들러
  const handleDayToggle = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleSave = () => {
    // [수정] 반복 데이터 전달 로직 추가
    console.log('저장', {
      id,
      content,
      category,
      isVisible,
      isRepeating,
      selectedDays,
      endDate,
    });
    navigate(-1);
  };

  return (
    <S.Wrapper>
      <S.TopBar>
        <S.BackButton
          type="button"
          onClick={() => navigate(-1)}
          aria-label="뒤로가기"
        >
          <BackIcon />
        </S.BackButton>
        <S.TopTitle>상세보기</S.TopTitle>
        <S.SaveButton type="button" onClick={handleSave}>
          저장
        </S.SaveButton>
      </S.TopBar>

      <S.Section>
        <S.SectionLabel>내용</S.SectionLabel>
        <S.TextareaWrapper>
          <Input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="퀘스트 내용을 입력해주세요."
        />
        </S.TextareaWrapper>
      </S.Section>

      <S.Section>
        <S.SectionLabel>카테고리</S.SectionLabel>
        <CategorySelector value={category} onChange={setCategory} />
      </S.Section>

      {/* [추가] 반복 설정 UI 영역 시작 */}
      <S.Section>
        <S.RepeatHeader>
          <S.RepeatTitleWrapper>
            <S.SectionLabel style={{ margin: 0 }}>반복할까요?</S.SectionLabel>
            <S.RepeatSubText>선택한 요일마다 퀘스트가 반복됩니다.</S.RepeatSubText>
          </S.RepeatTitleWrapper>
          <S.ToggleSwitch>
            <input
              type="checkbox"
              checked={isRepeating}
              onChange={(e) => setIsRepeating(e.target.checked)}
            />
            <span className="slider" />
          </S.ToggleSwitch>
        </S.RepeatHeader>

        {isRepeating && (
          <>
            <S.DaysGroup>
              {DAYS.map((day) => (
                <S.DayButton
                  key={day}
                  type="button"
                  $active={selectedDays.includes(day)}
                  onClick={() => handleDayToggle(day)}
                >
                  {day}
                </S.DayButton>
              ))}
            </S.DaysGroup>

            <S.EndDateRow onClick={() => console.log('날짜 피커 연동')}>
              <S.EndDateLabel>반복종료</S.EndDateLabel>
              <S.EndDateValue>
                {endDate} <span>&gt;</span>
              </S.EndDateValue>
            </S.EndDateRow>
          </>
        )}
      </S.Section>

      <CtaButton $variant="bottom" onClick={handleSave}>입력 완료</CtaButton>
    </S.Wrapper>
  );
}

export default QuestDetail;
