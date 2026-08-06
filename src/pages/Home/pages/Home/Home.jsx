// import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect } from 'react';
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

// 🟢 1. 필요한 API 불러오기
import { getMyInfo } from '../../../../api/memberApi';
import {
  getDailyQuestsByDate,
  toggleCheckDailyQuest,
  postponeDailyQuest,
  deleteDailyQuest,
  deleteRoutine,
} from '../../../../api/dailyQuestApi';
import { getStreaks } from '../../../../api/streakApi';
import { getEquippedCharacter } from '../../../../api/characterApi';
import { getCharacterHelloImage } from '../../../../utils/characterImage';

// 오늘 날짜 구하기 (YYYY-MM-DD)
const getTodayString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// 🟢 [추가] 요일 계산 헬퍼
const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// 오늘 요일 가져오기 (예: 'Mon')
const getTodayName = () => DAYS_OF_WEEK[new Date().getDay()];

// streakDays 일수에 따라 활성화될 요일 배열 생성
const getCheckedDays = (streakDays, lastCheckedDate) => {
  if (!streakDays || streakDays <= 0 || !lastCheckedDate) return [];
  
  // 날짜 문자열 파싱 (YYYY-MM-DD 대응)
  const [year, month, day] = lastCheckedDate.split('-').map(Number);
  const lastDate = new Date(year, month - 1, day);
  
  const lastDayIndex = lastDate.getDay(); // 마지막 체크 날짜의 요일 인덱스
  const checkedList = [];
  
  for (let i = 0; i < streakDays && i < 7; i++) {
    const targetIndex = (lastDayIndex - i + 7) % 7;
    checkedList.unshift(DAYS_OF_WEEK[targetIndex]);
  }
  return checkedList;
};

function Home() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('daily'); // 'daily' | 'party'
  
  // 🟢 목데이터 대신 API 데이터 상태로 관리
  const [dailyQuests, setDailyQuests] = useState([]);
  const [partyQuests, setPartyQuests] = useState([]);

  // 회원, 캐릭터 데이터, 스트릭 일수
  const [userInfo, setUserInfo] = useState(null);
  const [equippedCharacter, setEquippedCharacter] = useState(null);
  const [streakDays, setStreakDays] = useState(0);
  const [lastCheckedDate, setLastCheckedDate] = useState(null);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🟢 2. 마운트 시 초기 데이터 조회 (내 정보, 오늘 퀘스트, 스트릭)
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const todayStr = getTodayString();

        // 3개 API 병렬 호출
        const [myInfoRes, questsRes, streakRes] = await Promise.all([
          getMyInfo(),
          getDailyQuestsByDate(todayStr),
          getStreaks(),
        ]);

        // 내 정보 반영
        setUserInfo(myInfoRes.data || myInfoRes);

        // 일일 퀘스트 목록 변환 및 반영
        const fetchedQuests = (questsRes.data?.quests || []).map((q) => ({
          id: q.dailyQuestId,
          title: q.content,
          checked: q.isChecked,
          isRoutine: q.isRoutine,
          routineId: q.routineId,
          category: q.questCategory,
        }));
        setDailyQuests(fetchedQuests);

        // 스트릭 반영
        if (streakRes.data) {
          setStreakDays(streakRes.data.consecutiveDays || 0);
          setLastCheckedDate(streakRes.data.lastCheckedDate || null); // 추가
        }
      } catch (error) {
        console.error('Home 데이터 불러오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // 🟢 장착한 캐릭터 조회
  useEffect(() => {
    let ignore = false;

    const fetchEquippedCharacter = async () => {
      try {
        const response = await getEquippedCharacter();
        if (ignore) return;
        const { characterId, name } = response.data.data;
        setEquippedCharacter({
          id: characterId,
          name,
          image: getCharacterHelloImage(characterId),
        });
      } catch (error) {
        if (ignore) return;
        if (error.response?.status !== 404) {
          console.error('장착 캐릭터 조회 실패:', error);
        }
        setEquippedCharacter(null);
      }
    };

    fetchEquippedCharacter();
    return () => {
      ignore = true;
    };
  }, []);

  const quests = activeTab === 'daily' ? dailyQuests : partyQuests;

  // 레벨업 처리
  /* const handleLevelUp = async () => {
    try {
      const updatedData = await levelUp();
      const data = updatedData.data || updatedData;

      setUserInfo((prev) => ({
        ...prev,
        level: data.level,
        coin: data.coin,
        experience: data.experience,
      }));
      setShowLevelUp(true);
    } catch (error) {
      console.error('레벨업 요청 실패:', error);
    }
  };*/

  // 🟢 3. 퀘스트 체크 / 체크 해제 API 연동
  const handleToggle = async (id) => {
    if (activeTab === 'party') {
      // 파티 퀘스트 토글 로직
      setPartyQuests((prev) =>
        prev.map((q) => (q.id === id ? { ...q, checked: !q.checked } : q))
      );
      return;
    }

    const targetQuest = dailyQuests.find((q) => q.id === id);
    if (!targetQuest) return;

    const newCheckedState = !targetQuest.checked;

    // UI 먼저 변경 (Optimistic UI)
    setDailyQuests((prev) =>
      prev.map((q) => (q.id === id ? { ...q, checked: newCheckedState } : q))
    );

    try {
      const res = await toggleCheckDailyQuest(id, newCheckedState);
      
      // 경험치/코인 변경 반영 (API 응답 데이터 활용)
      if (res.data) {
        const { level, experience, leveledUp } = res.data;

        setUserInfo((prev) => ({
          ...prev,
          level: level ?? prev?.level,
          experience: experience ?? prev?.experience,
        }));

        // 서버가 leveledUp을 직접 내려주므로 별도 계산/호출 없이 바로 모달 표시
        if (leveledUp) {
          setShowLevelUp(true);
        }
      }
    } catch (error) {
      console.error('퀘스트 체크 상태 변경 실패:', error);
      // 실패 시 다시 롤백
      setDailyQuests((prev) =>
        prev.map((q) => (q.id === id ? { ...q, checked: targetQuest.checked } : q))
      );
    }
  };

  const handleEdit = (id) => {
    navigate('/questdetail', { state: { id } });
  };

  // 🟢 4. 일정 내일로 미루기 API 연동
  const handlePostpone = async (id) => {
    try {
      await postponeDailyQuest(id);
      // 오늘의 퀘스트 목록에서 제거
      setDailyQuests((prev) => prev.filter((q) => q.id !== id));
    } catch (error) {
      console.error('일정 미루기 실패:', error);
    }
  };

  // 🟢 5. 오늘 삭제 API 연동
  const handleDeleteToday = async (id) => {
    try {
      await deleteDailyQuest(id);
      setDailyQuests((prev) => prev.filter((q) => q.id !== id));
    } catch (error) {
      console.error('퀘스트 삭제 실패:', error);
    }
  };

  // 🟢 6. 반복(루틴) 전체 삭제 API 연동
  const handleDeleteForever = async (id) => {
    const targetQuest = dailyQuests.find((q) => q.id === id);
    try {
      if (targetQuest?.routineId) {
        await deleteRoutine(targetQuest.routineId);
      } else {
        await deleteDailyQuest(id);
      }
      setDailyQuests((prev) => prev.filter((q) => q.id !== id));
    } catch (error) {
      console.error('루틴/퀘스트 완전 삭제 실패:', error);
    }
  };

  const handleLeaveParty = (id) => {
    console.log('파티탈퇴', id);
  };

  const handleAddQuest = () => {
    navigate('/floatingadd_questdetail', { state: { type: activeTab } });
  };

  if (loading) {
    return <S.Wrapper>로딩 중...</S.Wrapper>;
  }

  // 🟢 퀘스트 목록 재조회 함수 추가
const refetchQuests = async () => {
  try {
    const todayStr = getTodayString();
    const questsRes = await getDailyQuestsByDate(todayStr);
    const fetchedQuests = (questsRes.data?.quests || []).map((q) => ({
      id: q.dailyQuestId,
      dailyQuestId: q.dailyQuestId, // 💡 두 식별자 모두 챙겨두면 안전합니다.
      title: q.content,
      checked: q.isChecked,
      isRoutine: q.isRoutine,
      routineId: q.routineId,
      category: q.questCategory,
    }));
    setDailyQuests(fetchedQuests);
  } catch (error) {
    console.error('퀘스트 목록 재조회 실패:', error);
  }
};

  return (
    <S.Wrapper>
      <Header />

      <S.Content $bgImage={bgGradient} >
        {/* 포인트 동적 연결 */}
        <PointBadge point={userInfo?.coin ?? 0} />

        <CharacterCard
          userName={userInfo?.nickname || '사용자'}
          characterName={equippedCharacter?.name || '두비'}
          characterImage={equippedCharacter?.image}
          exp={userInfo?.experience ?? 0}
          maxExp={1000} // 레벨별 필요 경험치에 맞게 설정
        />

        <StreakTracker
          streakDays={streakDays}
          checkedDays={getCheckedDays(streakDays, lastCheckedDate)}
          today={getTodayName()}
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
        onSuccess={refetchQuests}
      />


      <FloatingAddButton onClick={handleAddQuest} />
      <BottomNav active="home" onNavigate={(key) => navigate(`/${key}`)} />

      {showLevelUp && (
        <LevelUpModal 
          level={userInfo?.level ?? 1}
          onConfirm={() => setShowLevelUp(false)} 
        />
      )}
    </S.Wrapper>
  );
}

export default Home;
