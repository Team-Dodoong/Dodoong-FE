import React, { useState, useEffect }from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './MyPage.style';
import MyPageProfileImage from '../../assets/mypage-profile-image.png' ;
import { getMyInfo } from '../../api/memberApi';


const MyPage = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // 2. 마운트 시 회원 정보 API 호출
  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        setLoading(true);
        const response = await getMyInfo();
        
        // 백엔드 응답 형태가 { data: { ... } } 구조인 경우 response.data,
        // response 데이터 바로 리턴인 경우 response를 사용
        const data = response.data || response; 
        setUserInfo(data);
      } catch (error) {
        console.error("마이페이지 회원 정보 로딩 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyInfo();
  }, []);

  // 로딩 중일 때 표시 (필요 시 로딩 스피너 등으로 교체 가능)
  if (loading) {
    return <S.Container>로딩 중...</S.Container>;
  }

  return (
    <S.Container>
      <S.Header>
        <S.HeaderTitle>마이페이지</S.HeaderTitle>
      </S.Header>

      <S.ProfileSection onClick={() => navigate('/accountinfo')} >
        <S.Avatar 
          src={userInfo?.profileImageUrl || MyPageProfileImage} 
          alt="프로필" 
        />
        <S.ProfileInfo>
          <S.Nickname>{userInfo?.nickname || '사용자'}</S.Nickname>
          <S.UserIdRow>
            <S.UserId>{userInfo?.loginId || '-'}</S.UserId>
          </S.UserIdRow>
        </S.ProfileInfo>
        <S.ArrowIcon />
      </S.ProfileSection>

      <S.PointBanner>
        <S.PointLabel>보유 포인트</S.PointLabel>
        <S.PointValue>{userInfo?.coin ?? 0}</S.PointValue>
      </S.PointBanner>

      <S.MenuDivider />

      <S.MenuList>
        <S.MenuItem onClick={() => navigate('/terms')}>
          <S.MenuLeft>
            <S.MenuIcon>📄</S.MenuIcon>
            <S.MenuText>약관 및 정책</S.MenuText>
          </S.MenuLeft>
          <S.ArrowIcon />
        </S.MenuItem>
        
        <S.MenuItem onClick={() => navigate('/points')}>
          <S.MenuLeft>
            <S.MenuIcon>🪙</S.MenuIcon>
            <S.MenuText>포인트 내역</S.MenuText>
          </S.MenuLeft>
          <S.ArrowIcon />
        </S.MenuItem>

        <S.MenuItem onClick={() => navigate('/notice')}>
          <S.MenuLeft>
            <S.MenuIcon>📢</S.MenuIcon>
            <S.MenuText>공지사항</S.MenuText>
          </S.MenuLeft>
          <S.ArrowIcon />
        </S.MenuItem>

        <S.MenuItem onClick={() => navigate('/inquiry')}>
          <S.MenuLeft>
            <S.MenuIcon>🎧</S.MenuIcon>
            <S.MenuText>문의하기</S.MenuText>
          </S.MenuLeft>
          <S.ArrowIcon />
        </S.MenuItem>

        <S.MenuItem onClick={() => navigate('/account')}>
          <S.MenuLeft>
            <S.MenuIcon>🔒</S.MenuIcon>
            <S.MenuText>계정관리</S.MenuText>
          </S.MenuLeft>
          <S.ArrowIcon /> 
        </S.MenuItem>
      </S.MenuList>
    </S.Container>
  );
};

export default MyPage;