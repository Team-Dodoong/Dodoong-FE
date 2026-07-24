import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BackIcon from '../../../../assets/ic_back_24.svg?react';
import EyeOffIcon from '../../../../assets/ic_eye-off_24.svg?react';


import CategorySelector from './components/CategorySelector';
import CtaButton from "../../../../components/Button/CtaButton";
import Input from "../../../../components/Input/Input"
import * as S from './QuestDetail.style';

// 퀘스트 상세보기 / 수정 페이지
function QuestDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isNew = !id || id === 'new';

  const [content, setContent] = useState('');
  const [category, setCategory] = useState('urgent');
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

      <CtaButton $variant="bottom" onClick={() => navigate(-1)}>수정완료</CtaButton>
    </S.Wrapper>
  );
}

export default QuestDetail;
