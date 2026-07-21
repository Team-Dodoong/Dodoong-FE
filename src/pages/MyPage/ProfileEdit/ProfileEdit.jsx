import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './ProfileEdit.style';

const ProfileEdit = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('김이화');
  const [intro, setIntro] = useState('');

  const handleBack = () => {
    navigate(-1); // 이전 페이지(마이페이지)로 이동
  };

  return (
    <S.Container>
      <S.Header>
        <S.HeaderTitle>프로필 수정</S.HeaderTitle>
        <S.CancelButton onClick={handleBack}>취소</S.CancelButton>
      </S.Header>

      <S.AvatarContainer>
        <S.Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" />
        <S.AddBadge>+</S.AddBadge>
      </S.AvatarContainer>

      <S.FormGroup>
        <S.LabelRow>
          <S.Label>닉네임</S.Label>
          <S.Count>{nickname.length}/16</S.Count>
        </S.LabelRow>
        <S.InputWrapper>
          <S.Input value={nickname} onChange={(e) => setNickname(e.target.value)} maxLength={16} />
          {nickname && <S.ClearButton onClick={() => setNickname('')}>×</S.ClearButton>}
        </S.InputWrapper>
      </S.FormGroup>

      <S.FormGroup>
        <S.LabelRow>
          <S.Label>나의 소개글</S.Label>
        </S.LabelRow>
        <S.TextAreaWrapper>
          <S.TextArea 
            placeholder="아이디를 입력해 주세요" 
            value={intro} 
            onChange={(e) => setIntro(e.target.value)} 
          />
          <S.HideIcon>👁️‍🗨️</S.HideIcon>
        </S.TextAreaWrapper>
      </S.FormGroup>

      <S.SubmitButton onClick={() => navigate(-1)}>저장하기</S.SubmitButton>
    </S.Container>
  );
};

export default ProfileEdit;