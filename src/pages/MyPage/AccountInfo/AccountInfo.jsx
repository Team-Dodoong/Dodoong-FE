import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './AccountInfo.style';
import MyPageProfileImage from '../../../assets/mypage-profile-image.png' ;
import { getMyInfo, logout } from '../../../api/memberApi';

const AccountInfo = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // 1. 회원 정보 상태 추가
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // 2. 마운트 시 회원 정보 불러오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        const response = await getMyInfo();
        const data = response.data || response;
        setUserInfo(data);
      } catch (error) {
        console.error("회원 정보 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  // 3. 로그아웃 처리 함수
  const handleLogout = async () => {
    try {
      await logout(); // 서버 로그아웃 API 호출
    } catch (error) {
      console.error("로그아웃 실패:", error);
    } finally {
      // API 성공 여부와 상관없이 클라이언트 토큰 정리 후 로그인/온보딩 페이지로 이동
      localStorage.removeItem("token");
      setShowLogoutModal(false);
      navigate('/');
    }
  };

  // 아이디 복사 기능 (서버에서 받아온 loginId 복사)
  const handleCopyId = (e) => {
    e.stopPropagation(); // 부모 태그의 onClick 이벤트 전달 방지
    if (userInfo?.loginId) {
      navigator.clipboard.writeText(userInfo.loginId);
      alert("아이디가 복사되었습니다.");
    }
  };

  if (loading) {
    return <S.Container>로딩 중...</S.Container>;
  }


  return (
    <S.Container>
      <S.Header>
        <S.BackButton onClick={() => navigate(-1)}/>
        <S.HeaderTitle>계정 정보</S.HeaderTitle>
      </S.Header>

      <S.AvatarSection>
        <S.Avatar src={userInfo?.profileImageUrl || MyPageProfileImage} alt="프로필" />
      </S.AvatarSection>

      <S.InfoGroup onClick={() => navigate('/profile/edit')} >
        <S.Label>닉네임</S.Label>
        <S.ValueRow>
          <S.ValueText>{userInfo?.nickname || '사용자'}</S.ValueText>
          <S.Arrow />
        </S.ValueRow>
      </S.InfoGroup>

      <S.InfoGroup>
        <S.Label>아이디</S.Label>
        <S.ValueRow>
          <S.ValueText>{userInfo?.loginId || '-'}</S.ValueText>
          <S.CopyButton onClick={handleCopyId}>복사</S.CopyButton>
        </S.ValueRow>
      </S.InfoGroup>

      <S.InfoGroup>
        <S.Label>이메일</S.Label>
        <S.ValueRow>
          <S.ValueText style={{ color: '#666' }}>
            {userInfo?.email || userInfo?.loginId || '-'}
          </S.ValueText>
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
              <S.ModalButton confirm onClick={handleLogout}>
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