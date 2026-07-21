import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BackIcon from '../../../../assets/ic_back_24.svg?react';
import EyeOffIcon from '../../../../assets/ic_eye-off_24.svg?react';

import BottomCta from '../../../../components/Button/CtaButton';

import CategorySelector from './components/CategorySelector';
import * as S from './QuestDetail.style';

// 퀘스트 상세보기 / 수정 페이지
function QuestDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isNew = !id || id === 'new';

  const [content, setContent] = useState('');
  const [category, setCategory] = useState('postponable');
  const [isVisible, setIsVisible] = useState(true);

  const handleSave = () => {
    // TODO: 생성/수정 API 연동
    console.log('저장', { id, content, category, isVisible });
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
          <S.Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="퀘스트 내용을 입력해주세요."
          />
          <S.VisibilityToggle
            type="button"
            onClick={() => setIsVisible((prev) => !prev)}
            aria-label="공개 여부 전환"
          >
            <EyeOffIcon color={isVisible ? '#C7C7CC' : '#FF9142'} />
          </S.VisibilityToggle>
        </S.TextareaWrapper>
      </S.Section>

      <S.Section>
        <S.SectionLabel>카테고리</S.SectionLabel>
        <CategorySelector value={category} onChange={setCategory} />
      </S.Section>

      <BottomCta
        variant="bottom"
        label={isNew ? '등록완료' : '수정완료'}
        onClick={handleSave}
        disabled={!content.trim()}
      />
    </S.Wrapper>
  );
}

export default QuestDetail;
