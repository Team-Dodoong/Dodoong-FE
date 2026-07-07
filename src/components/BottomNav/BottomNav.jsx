import React, { useState } from 'react';
import * as S from './BottomNav.style';

// 1. 피그마에서 에셋 가져오기
import HomeIcon from '../../assets/icon-home.svg';
import QuestIcon from '../../assets/icon-quest.svg';
import CharacterIcon from '../../assets/icon-character.svg';
import PartyIcon from '../../assets/icon-party.svg';
import ProfileIcon from '../../assets/icon-profile.svg';

const BottomNav = () => {
  const [activeTab, setActiveTab] = useState('home');

  // 2. 상단에서 import한 이름(HomeIcon 등)을 그대로 매핑
  const navItems = [
    { id: 'home', label: '홈', icon: HomeIcon },
    { id: 'quest', label: '일일퀘스트', icon: QuestIcon },
    { id: 'character', label: '캐릭터 관리', icon: CharacterIcon },
    { id: 'party', label: '파티', icon: PartyIcon },
    { id: 'profile', label: '마이페이지', icon: ProfileIcon },
  ];

  return (
    <S.NavContainer>
      <S.NavList>
        {navItems.map((item) => (
          <S.NavItem 
            key={item.id} 
            $isActive={activeTab === item.id} 
            onClick={() => setActiveTab(item.id)}
          >
            {/* 3. 배열 속성명에 맞게 item.icon으로 전달 */}
            <S.Icon 
              src={item.icon} 
              alt={item.label}
              $isActive={activeTab === item.id} 
            />
            <S.Label $isActive={activeTab === item.id}>
              {item.label}
            </S.Label>
          </S.NavItem>
        ))}
      </S.NavList>
    </S.NavContainer>
  );
}; 

export default BottomNav;