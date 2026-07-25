import { useRef, useState } from "react";
import * as S from "./ChatList.style";
import SearchBar from "../../../components/SearchBar/SearchBar";
import LeaveModal from "../components/LeaveModal";
const LONG_PRESS_DELAY = 500;

const MOCK_CHATS = [
  {
    id: 1,
    name: "모여라 Team 08",
    count: 22,
    message: "애들아 공부같이하자...나 진짜 잘 모고 싶어",
    time: "",
    image: "https://picsum.photos/seed/chat1/100",
    isNew: true,
  },
  {
    id: 2,
    name: "삼 취준 스터디",
    count: 12,
    message:
      "혹시 서울 끝 가 나오신분 계신가요?ㅠㅠ 풀은 문볼 스택도 궁금해요...",
    time: "오전 09:48",
    image: "https://picsum.photos/seed/chat2/100",
    isNew: false,
  },
  {
    id: 3,
    name: "현차 면소하실분",
    count: 16,
    message: "주식님 인증하셨나요 오늘까지 인증해주세요",
    time: "어제",
    image: "https://picsum.photos/seed/chat3/100",
    isNew: false,
  },
  {
    id: 4,
    name: "직장인들의 출근인증",
    count: 7,
    message: "다들 화요일도 파이팅..",
    time: "어제",
    image: "https://picsum.photos/seed/chat4/100",
    isNew: false,
  },
  {
    id: 5,
    name: "종강을 향해서",
    count: 56,
    message: "아..학점이...다..나빠질수가 있는거면군아...",
    time: "06.21",
    image: "https://picsum.photos/seed/chat5/100",
    isNew: false,
  },
  {
    id: 6,
    name: "반수생들 모임",
    count: 34,
    message: "다들 이번주도 화이팅이에요~",
    time: "06.14",
    image: "https://picsum.photos/seed/chat6/100",
    isNew: false,
  },
  {
    id: 7,
    name: "이화여대 운동모임",
    count: 14,
    message: "아구 사람밖이 궁금한거있으면 편하게 질문주세요!",
    time: "06.14",
    image: "https://picsum.photos/seed/chat7/100",
    isNew: false,
  },
];

function ChatList() {
  const [search, setSearch] = useState("");
  const [pressedId, setPressedId] = useState(null);
  const pressTimerRef = useRef(null);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);

  const filtered = MOCK_CHATS.filter(
    (chat) => chat.name.includes(search) || chat.message.includes(search),
  );

  const handleLongPress = (id) => {
    setPressedId(id);
  };

  const startPressTimer = (id) => {
    clearTimeout(pressTimerRef.current);
    pressTimerRef.current = setTimeout(
      () => handleLongPress(id),
      LONG_PRESS_DELAY,
    );
  };

  const cancelPressTimer = () => {
    clearTimeout(pressTimerRef.current);
  };

  return (
    <S.Container onClick={() => setPressedId(null)}>
      <S.Header>
        <S.BackIcon />
        <S.HeaderTitle>채팅</S.HeaderTitle>
        <S.Placeholder />
      </S.Header>
      <S.SearchBarWrapper>
        <SearchBar placeholder="채팅방 이름이나 내용을 검색해주세요" />
      </S.SearchBarWrapper>
      <S.ChatListWrapper>
        {filtered.map((chat) => (
          <S.ChatItem
            key={chat.id}
            onContextMenu={(e) => {
              e.preventDefault();
              handleLongPress(chat.id);
            }}
            onTouchStart={() => startPressTimer(chat.id)}
            onTouchEnd={cancelPressTimer}
            onTouchCancel={cancelPressTimer}
            onMouseDown={() => startPressTimer(chat.id)}
            onMouseUp={cancelPressTimer}
            onMouseLeave={cancelPressTimer}
          >
            <S.ChatImage src={chat.image} alt={chat.name} />
            <S.ChatInfo>
              <S.ChatTop>
                <S.ChatName>{chat.name}</S.ChatName>
                <S.ChatCount>{chat.count}</S.ChatCount>
                <S.ChatTime>{chat.time}</S.ChatTime>
              </S.ChatTop>
              <S.ChatMessage>{chat.message}</S.ChatMessage>
            </S.ChatInfo>

            {pressedId === chat.id && (
              <S.LeaveButton
                onClick={(e) => {
                  e.stopPropagation();
                  setPressedId(null);
                  setShowLeaveModal(true);
                }}
              >
                파티탈퇴
              </S.LeaveButton>
            )}
          </S.ChatItem>
        ))}
      </S.ChatListWrapper>
      {showLeaveModal && (
        <LeaveModal
          onCancel={() => setShowLeaveModal(false)}
          onConfirm={() => setShowLeaveModal(false)}
        />
      )}
    </S.Container>
  );
}

export default ChatList;
