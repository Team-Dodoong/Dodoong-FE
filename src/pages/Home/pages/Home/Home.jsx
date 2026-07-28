// import { motion, useAnimation } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../../../../components/Header/Header'
import BottomNav from '../../../../components/BottomNav/BottomNav';
import PointBadge from '../../../../components/PointBadge/PointBadge';
import BottomSheet from '../Home/components/BottomSheet/BottomSheet';
import CharacterCard from './components/CharacterCard/CharacterCard';
import StreakTracker from './components/StreakTracker/StreakTracker';
import LevelUpModal from './components/LevelUpModal/LevelUpModal';
import FloatingAddButton from './components/FloatingAddButton/FloatingAddButton';


import * as S from './Home.style';

import bgGradient from '../../../../assets/Rectangle 3410.png';

// 실제로는 API에서 받아올 목데이터입니다.
const INITIAL_DAILY_QUESTS = Array.from({ length: 8 }, (_, i) => ({
  id: `daily-${i + 1}`,
  title: 'EFUB 세미나 과제 제출',
  checked: false,
}));

const INITIAL_PARTY_QUESTS = Array.from({ length: 4 }, (_, i) => ({
  id: `party-${i + 1}`,
  tag: '운동 한시간인증',
  title: '런닝 1시간 인증하기',
  checked: false,
}));

function Home() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('daily'); // 'daily' | 'party'
  const [dailyQuests, setDailyQuests] = useState(INITIAL_DAILY_QUESTS);
  const [partyQuests, setPartyQuests] = useState(INITIAL_PARTY_QUESTS);

  const [level, setLevel] = useState(9);
  const [showLevelUp, setShowLevelUp] = useState(false);

  const quests = activeTab === 'daily' ? dailyQuests : partyQuests;
  const setQuests = activeTab === 'daily' ? setDailyQuests : setPartyQuests;

  const updateQuests = (updater) => setQuests((prev) => updater(prev));

  const handleToggle = (id) => {
    updateQuests((prev) =>
      prev.map((q) => (q.id === id ? { ...q, checked: !q.checked } : q))
    );
    // TODO: 완료 처리 API 연동, 경험치 반영, 레벨업 시 setShowLevelUp(true)
  };

  const handleEdit = (id) => {
    navigate('/questdetail', { state: { id } });
  };

  const handlePostpone = (id) => {
    // TODO: 내일로 미루기 API 연동
    console.log('내일로 미루기', id);
  };

  const handleDeleteToday = (id) => {
    updateQuests((prev) => prev.filter((q) => q.id !== id));
  };

  const handleDeleteForever = (id) => {
    updateQuests((prev) => prev.filter((q) => q.id !== id));
    // TODO: 반복 등록 자체를 삭제하는 API 호출
  };

  const handleLeaveParty = (id) => {
    // TODO: 파티 탈퇴 API 연동
    console.log('파티탈퇴', id);
  };

  const handleAddQuest = () => {
    navigate('/questdetail', { state: { type: activeTab } });
  };

  return (
    <S.Wrapper>
      <Header onChatClick={() => navigate('/party/chat')} />

      <S.Content $bgImage={bgGradient} >
        <PointBadge point={1270} />

        <CharacterCard
          userName="김이화"
          characterName="두비"
          exp={360}
          maxExp={1000}
        />

        <StreakTracker
          streakDays={3}
          checkedDays={['Sun', 'Mon', 'Tue']}
          today="Wed"
        />
      </S.Content>


      <BottomSheet
        activeTab={activeTab}
        onTabChange={setActiveTab}
        quests={quests}
        onToggle={handleToggle}
        onEdit={handleEdit}
        onPostpone={handlePostpone}
        onDeleteToday={handleDeleteToday}
        onDeleteForever={handleDeleteForever}
        onLeaveParty={handleLeaveParty}
      />


      <FloatingAddButton onClick={handleAddQuest} />
      <BottomNav active="home" onNavigate={(key) => navigate(`/${key}`)} />

      {showLevelUp && (
        <LevelUpModal level={level} onConfirm={() => setShowLevelUp(false)} />
      )}
    </S.Wrapper>
  );
}

export default Home;
