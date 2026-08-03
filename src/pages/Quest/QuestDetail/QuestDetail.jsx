import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import BackIcon from '../../../assets/ic_back_24.svg?react';
// import EyeOffIcon from '../../../../assets/ic_eye-off_24.svg?react';


import CategorySelector from './components/CategorySelector';
import CtaButton from "../../../components/Button/CtaButton";
import Input from "../../../components/Input/Input"
import * as S from './QuestDetail.style';

// [추가] 요일 목록 데이터
import { createDailyQuest, updateDailyQuest } from '../../../api/dailyQuestApi';

const DAYS = ['월', '화', '수', '목', '금', '토', '일'];

// 🟢 1. UI용 요일 -> 백엔드 요일 매핑
const DAY_MAP_TO_SERVER = {
  '월': 'MONDAY',
  '화': 'TUESDAY',
  '수': 'WEDNESDAY',
  '목': 'THURSDAY',
  '금': 'FRIDAY',
  '토': 'SATURDAY',
  '일': 'SUNDAY',
};

const DAY_MAP_FROM_SERVER = {
  'MONDAY': '월',
  'TUESDAY': '화',
  'WEDNESDAY': '수',
  'THURSDAY': '목',
  'FRIDAY': '금',
  'SATURDAY': '토',
  'SUNDAY': '일',
};

// 🟢 2. UI용 카테고리 -> 백엔드 카테고리 Enum 매핑 (CategorySelector 구조에 맞게 매칭)
const CATEGORY_MAP_TO_SERVER = {
  'important': 'IMPORTANT_URGENT',             // 👈 추가! (현재 'important'가 들어가고 있었음)
  'important_urgent': 'IMPORTANT_URGENT',
  'important_not_urgent': 'IMPORTANT_NOT_URGENT',
  'not_important_urgent': 'NOT_IMPORTANT_URGENT',
  'not_important_not_urgent': 'NOT_IMPORTANT_NOT_URGENT',
  'q1': 'IMPORTANT_URGENT',
  'q2': 'IMPORTANT_NOT_URGENT',
  'q3': 'NOT_IMPORTANT_URGENT',
  'q4': 'NOT_IMPORTANT_NOT_URGENT',
  // 만약 selector value가 이미 'IMPORTANT_URGENT' 등이라면 그대로 전달
  'urgent': 'IMPORTANT_URGENT',
};

// 퀘스트 상세보기 / 수정 페이지
function QuestDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const initialQuestData = location.state?.quest;
  const isNew = !id || id === 'new';

  const [content, setContent] = useState('');
  const [category, setCategory] = useState('urgent');
  const [isVisible, setIsVisible] = useState(true);

  //반복 설정 관련 상태
  const [isRepeating, setIsRepeating] = useState(false);
  const [selectedDays, setSelectedDays] = useState(['월', '화', '수', '목', '금']);
  const [endDate, setEndDate] = useState('2026.12.31');
  const [isLoading, setIsLoading] = useState(false);

  // 🟢 기존 데이터가 있는 경우 (수정 모드) 초기 상태 설정
  useEffect(() => {
    if (!isNew && initialQuestData) {
      setContent(initialQuestData.content || '');
      if (initialQuestData.questCategory) {
        setCategory(initialQuestData.questCategory);
      }
      setIsRepeating(!!initialQuestData.isRoutine);
      if (initialQuestData.repeatDays) {
        setSelectedDays(
          initialQuestData.repeatDays.map((d) => DAY_MAP_FROM_SERVER[d] || d)
        );
      }
      if (initialQuestData.endDate) {
        setEndDate(initialQuestData.endDate);
      }
    }
  }, [isNew, initialQuestData]);

  // 요일 선택/해제 핸들러
  const handleDayToggle = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  // 🟢 퀘스트 저장 (생성 / 수정) 핸들러
  const handleSave = async () => {
    if (!content.trim()) {
      alert('퀘스트 내용을 입력해 주세요.');
      return;
    }

    // 서버용 데이터 변환
    const questCategory = CATEGORY_MAP_TO_SERVER[category] || category;
    
    // YYYY.MM.DD -> YYYY-MM-DD 포맷 변환
    const formattedEndDate = endDate ? endDate.replace(/\./g, '-') : null;

    const serverRepeatDays = selectedDays.map((d) => DAY_MAP_TO_SERVER[d] || d);

    try {
      setIsLoading(true);

      if (!isNew) {
        // 🟢 1. 기존 퀘스트 수정 (PATCH /api/daily-quests/{id})
        await updateDailyQuest(id, {
          content: content.trim(),
          questCategory: questCategory, // 예: 'IMPORTANT_URGENT'
        });
      } else {
        // 🟢 2. 신규 퀘스트 생성 (POST /api/daily-quests)
        // 백엔드 요청 DTO 명세에 맞춘 데이터 구성
        const requestBody = {
          content: content.trim(),
          questCategory: questCategory,
          isRoutine: isRepeating,         // 일회성 퀘스트인 경우 false
          repeatDays: isRepeating ? serverRepeatDays : [],           // 빈 배열 또는 null (백엔드 명세에 맞춤)
          endDate: isRepeating ? formattedEndDate : null,            // 일회성일 경우 null
        };

        await createDailyQuest(requestBody);
      }

      // 저장 성공 시 이전 화면으로 돌아가기
      navigate(-1);
    } catch (error) {
      console.error('퀘스트 저장 실패:', error);
      // 백엔드에서 내려준 에러 메시지가 있다면 출력
      const errorMessage = 
        error.response?.data?.message || '요청 본문이 올바르지 않습니다.';
      alert(`퀘스트 저장 실패: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
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
        <S.TopTitle>{isNew ? '퀘스트 생성' : '상세보기'}</S.TopTitle>
        <S.SaveButton type="button" onClick={handleSave} disabled={isLoading}>
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
              disabled={!isNew}
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
                  disabled={!isNew}
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

      <CtaButton $variant="bottom" onClick={handleSave} disabled={isLoading}>
        {isLoading ? '저장 중...' : '입력 완료'}
      </CtaButton>
    </S.Wrapper>
  );
}

export default QuestDetail;
