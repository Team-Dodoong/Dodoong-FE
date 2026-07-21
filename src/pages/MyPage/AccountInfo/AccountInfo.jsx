import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './AccountInfo.style';

const AccountInfo = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <S.Container>
      <S.Header>
        <S.BackButton onClick={() => navigate(-1)}>←</S.BackButton>
        <S.HeaderTitle>계정 정보</S.HeaderTitle>
      </S.Header>

      <S.AvatarSection>
        <S.Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" />
      </S.AvatarSection>

      <S.InfoGroup >
        <S.Label>닉네임</S.Label>
        <S.ValueRow>
          <S.ValueText>김이화</S.ValueText>
          <S.Arrow onClick={() => navigate('/profile/edit')} />
        </S.ValueRow>
      </S.InfoGroup>

      <S.InfoGroup>
        <S.Label>아이디</S.Label>
        <S.ValueRow>
          <S.ValueText>Px46BwfhL01Q</S.ValueText>
          <S.CopyButton onClick={() => navigator.clipboard.writeText('Px46BwfhL01Q')}>복사</S.CopyButton>
        </S.ValueRow>
      </S.InfoGroup>

      <S.InfoGroup>
        <S.Label>이메일</S.Label>
        <S.ValueRow>
          <S.ValueText style={{ color: '#666' }}>kimewha@gmail.com</S.ValueText>
        </S.ValueRow>
      </S.InfoGroup>

      <S.ActionItem onClick={() => setShowLogoutModal(true)}>
        <span>로그아웃</span>
        <S.Arrow />
      </S.ActionItem>

      <S.ActionItem >
        <span >서비스 탈퇴</span>
        <S.Arrow onClick={() => navigate('/profile/servicewithdraw')} />
      </S.ActionItem>

      {showLogoutModal && (
        <S.ModalOverlay>
          <S.ModalBox>
            <S.ModalTitle>두둥에서 로그아웃 하시겠습니까?</S.ModalTitle>
            <S.ModalButtons>
              <S.ModalButton onClick={() => setShowLogoutModal(false)}>취소</S.ModalButton>
              <S.ModalButton confirm onClick={() => {
                setShowLogoutModal(false);
                navigate('/')
              }}>
                로그아웃
              </S.ModalButton>
            </S.ModalButtons>
          </S.ModalBox>
        </S.ModalOverlay>
      )}
    </S.Container>
  );
};

export default AccountInfo;