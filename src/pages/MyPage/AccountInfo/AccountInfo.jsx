import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './AccountInfo.style';
import MyPageProfileImage from '../../../assets/mypage-profile-image.png' ;


const AccountInfo = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <S.Container>
      <S.Header>
        <S.BackButton onClick={() => navigate(-1)}/>
        <S.HeaderTitle>계정 정보</S.HeaderTitle>
      </S.Header>

      <S.AvatarSection>
        <S.Avatar src={MyPageProfileImage} />
      </S.AvatarSection>

      <S.InfoGroup onClick={() => navigate('/profile/edit')} >
        <S.Label>닉네임</S.Label>
        <S.ValueRow>
          <S.ValueText>김이화</S.ValueText>
          <S.Arrow />
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

      <S.ActionItem onClick={() => navigate('/profile/servicewithdraw')} >
        <span >서비스 탈퇴</span>
        <S.Arrow />
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