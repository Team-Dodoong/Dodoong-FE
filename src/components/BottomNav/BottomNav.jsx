import React from 'react';
import * as S from './BottomNav.style';
import { useNavigate, useLocation } from 'react-router-dom';

// 1. 피그마에서 에셋 가져오기
import HomeIcon from '../../assets/icon-home.svg';
import QuestIcon from '../../assets/icon-quest.svg';
import CharacterIcon from '../../assets/icon-character.svg';
import PartyIcon from '../../assets/icon-party.svg';
import MyPageIcon from '../../assets/icon-mypage.svg';

import HomeFilledIcon from '../../assets/icon-home-filled.svg';
import QuestFilledIcon from '../../assets/icon-quest-filled.svg';
import CharacterFilledIcon from '../../assets/icon-character-filled.svg';
import PartyFilledIcon from '../../assets/icon-party-filled.svg';
import MyPageFilledIcon from '../../assets/icon-mypage-filled.svg';

const BottomNav = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 함수
  const location = useLocation(); // 현재 브라우저의 주소(URL)를 가져오는 훅

  // 데이터 배열에 각각 매칭될 이동 경로(path)를 추가합니다.
  const navItems = [
    { id: 'home', label: '홈', path: '/', icon: HomeIcon, filledIcon: HomeFilledIcon },
    { id: 'quest', label: '일일퀘스트', path: '/quest', icon: QuestIcon, filledIcon: QuestFilledIcon },
    { id: 'character', label: '캐릭터 관리', path: '/character', icon: CharacterIcon, filledIcon: CharacterFilledIcon },
    { id: 'party', label: '파티', path: '/party', icon: PartyIcon, filledIcon: PartyFilledIcon },
    { id: 'mypage', label: '마이페이지', path: '/mypage', icon: MyPageIcon, filledIcon: MyPageFilledIcon },
  ];

  return (
    <S.NavContainer>
      <S.NavList>
        {navItems.map((item) => {
          // 현재 주소창(location.pathname)이 아이템의 path와 일치하는지 확인하여 활성화 여부를 결정
          const isActive = location.pathname === item.path;

          return (
            <S.NavItem 
              key={item.id} 
              $isActive={isActive} 
              onClick={() => navigate(item.path)} // 👈 클릭 시 해당 주소로 이동!
            >
              <S.Icon 
                src={isActive ? item.filledIcon : item.icon} 
                alt={item.label} 
              />
              <S.Label $isActive={isActive}>{item.label}</S.Label>
            </S.NavItem>
          );
        })}
      </S.NavList>
    </S.NavContainer>
  );
};

export default BottomNav;