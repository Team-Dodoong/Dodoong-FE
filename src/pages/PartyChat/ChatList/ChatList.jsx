import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./ChatList.style";
import SearchBar from "../../../components/SearchBar/SearchBar";
import LeaveModal from "../components/LeaveModal";
import { MOCK_CHATS } from "../mockChats";

const LONG_PRESS_DELAY = 500;

function ChatList() {
  const navigate = useNavigate();
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

  const handleChatClick = (chat) => {
    if (pressedId !== null) {
      setPressedId(null);
      return;
    }
    navigate(`/party/chat/${chat.id}`);
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
            onClick={() => handleChatClick(chat)}
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
