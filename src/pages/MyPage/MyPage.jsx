import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './MyPage.style';
import MyPageProfileImage from '../../assets/mypage-profile-image.png' ;

const MyPage = () => {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.Header>
        <S.HeaderTitle>마이페이지</S.HeaderTitle>
      </S.Header>

      <S.ProfileSection onClick={() => navigate('/accountinfo')} >
        <S.Avatar src={MyPageProfileImage} alt="프로필" />
        <S.ProfileInfo>
          <S.Nickname>김이화</S.Nickname>
          <S.UserIdRow>
            <S.UserId>Px46BwfhL01Q</S.UserId>
          </S.UserIdRow>
        </S.ProfileInfo>
        <S.ArrowIcon />
      </S.ProfileSection>

      <S.PointBanner>
        <S.PointLabel>보유 포인트</S.PointLabel>
        <S.PointValue>700</S.PointValue>
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
          <S.ArrowIcon /> {/* 계정관리 페이지로 이동시켜야 함 */}
        </S.MenuItem>
      </S.MenuList>
    </S.Container>
  );
};

export default MyPage;