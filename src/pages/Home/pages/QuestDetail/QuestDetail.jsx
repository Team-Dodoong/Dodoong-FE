import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import BackIcon from '../../../../assets/ic_back_24.svg?react';
import EyeOffIcon from '../../../../assets/ic_eye-off_24.svg?react';


import CategorySelector from './components/CategorySelector';
import CtaButton from "../../../../components/Button/CtaButton";
import Input from "../../../../components/Input/Input"
import * as S from './QuestDetail.style';

import { updateDailyQuest } from '../../../../api/dailyQuestApi';

// 퀘스트 상세보기 / 수정 페이지
function QuestDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // state로 넘어온 초기값 혹은 기본값 세팅
  const initialQuest = location.state?.quest || {};

  const [content, setContent] = useState(initialQuest.content || initialQuest.title || '');
  const [category, setCategory] = useState(initialQuest.category || 'IMPORTANT_URGENT');
  const [loading, setLoading] = useState(false);

  // 🟢 2. 저장(수정) 처리 함수
  const handleSave = async () => {
    if (!content.trim()) {
      alert('퀘스트 내용을 입력해 주세요.');
      return;
    }

    try {
      setLoading(true);
      
      // 🟢 수정/생성 API에 맞춘 데이터 객체 구성
      // isRoutine은 필수값일 확률이 높으므로 false를 기본값으로 추가했습니다.
      const payload = {
        content: content,
        questCategory: category,
        isRoutine: false,        // 🟢 필수값 추가
        repeatDays: null,        // 🟢 필수값 추가 (일회성일 경우 null)
        endDate: null            // 🟢 필수값 추가 (일회성일 경우 null)
      };

      // 🟢 만약 수정(update) 상황이라면 updateDailyQuest를, 
      // 생성 상황이라면 createDailyQuest를 호출해야 합니다.
      if (id && id !== 'new') {
        await updateDailyQuest(id, { content, questCategory: category });
      } else {
        await createDailyQuest(payload);
      }

      navigate(-1);
    } catch (error) {
      console.error('퀘스트 저장 실패:', error);
      alert('퀘스트 저장 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
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
        <S.TopTitle>상세보기</S.TopTitle>
        <S.SaveButton type="button" onClick={handleSave} disabled={loading}>
          {loading ? '저장 중...' : '저장'}
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

      <CtaButton $variant="bottom" onClick={handleSave} disabled={loading}>
        {loading ? '수정 중...' : '수정완료'}
      </CtaButton>
    </S.Wrapper>
  );
}

export default QuestDetail;
