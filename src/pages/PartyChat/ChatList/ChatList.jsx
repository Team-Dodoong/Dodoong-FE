import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./ChatList.style";
import SearchBar from "../../../components/SearchBar/SearchBar";
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal";
import defaultChatImage from "../../../assets/character_두비.png";
import { getChatRooms } from "../../../api/chatApi";
import { leaveParty } from "../../../api/partyApi";

const LONG_PRESS_DELAY = 500;

const formatChatTime = (isoString) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (date.toDateString() === now.toDateString()) {
    const hours = date.getHours();
    const period = hours < 12 ? "오전" : "오후";
    const displayHour = hours % 12 === 0 ? 12 : hours % 12;
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${period} ${displayHour}:${minutes}`;
  }
  if (date.toDateString() === yesterday.toDateString()) return "어제";

  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${mm}.${dd}`;
};

function ChatList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [pressedId, setPressedId] = useState(null);
  const pressTimerRef = useRef(null);
  const justLongPressedRef = useRef(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [leaving, setLeaving] = useState(false);
  const [leaveError, setLeaveError] = useState(null);

  useEffect(() => {
    let ignore = false;

    const loadChatRooms = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getChatRooms();
        if (ignore) return;
        const list = response.data.data.map((room) => ({
          id: room.partyId,
          name: room.partyName,
          count: room.memberCount,
          message: room.lastMessage ?? "아직 메시지가 없습니다.",
          time: formatChatTime(room.lastMessageAt),
          image: room.partyImageUrl ?? defaultChatImage,
        }));
        setChats(list);
      } catch (err) {
        if (!ignore) {
          console.error("채팅방 목록 조회 실패", err);
          setError("채팅방 목록을 불러오지 못했습니다.");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadChatRooms();
    return () => {
      ignore = true;
    };
  }, []);

  const filtered = chats.filter(
    (chat) => chat.name.includes(search) || chat.message.includes(search),
  );

  const closeLeaveModal = () => {
    setShowLeaveModal(false);
    setSelectedChat(null);
    setLeaveError(null);
  };

  const handleLeaveConfirm = async () => {
    if (!selectedChat) return;
    setLeaving(true);
    setLeaveError(null);
    try {
      await leaveParty(selectedChat.id);
      setChats((prev) => prev.filter((chat) => chat.id !== selectedChat.id));
      closeLeaveModal();
    } catch (err) {
      console.error("파티 탈퇴 실패", err);
      setLeaveError(err.response?.data?.message ?? "파티 탈퇴에 실패했습니다.");
    } finally {
      setLeaving(false);
    }
  };

  const handleLongPress = (id) => {
    justLongPressedRef.current = true;
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

  const handleChatClick = (e, chat) => {
    if (justLongPressedRef.current) {
      justLongPressedRef.current = false;
      e.stopPropagation();
      return;
    }
    if (pressedId !== null) {
      setPressedId(null);
      return;
    }
    navigate(`/party/chat/${chat.id}`);
  };

  return (
    <S.Container onClick={() => setPressedId(null)}>
      <S.Header>
        <S.BackIcon onClick={() => navigate(-1)} />
        <S.HeaderTitle>채팅</S.HeaderTitle>
        <S.Placeholder />
      </S.Header>
      <S.SearchBarWrapper>
        <SearchBar
          placeholder="채팅방 이름이나 내용을 검색해주세요"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </S.SearchBarWrapper>
      <S.ChatListWrapper>
        {loading && <S.ChatMessage>불러오는 중...</S.ChatMessage>}
        {error && <S.ChatMessage>{error}</S.ChatMessage>}
        {!loading && !error && filtered.length === 0 && (
          <S.ChatMessage>참여 중인 채팅방이 없습니다.</S.ChatMessage>
        )}
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
            onClick={(e) => handleChatClick(e, chat)}
          >
            <S.ChatImage src={chat.image} alt={chat.name} />
            <S.ChatInfo>
              <S.ChatTop>
                <S.InfoWrapper>
                  <S.ChatName>{chat.name}</S.ChatName>
                  <S.ChatCount>{chat.count}</S.ChatCount>
                </S.InfoWrapper>
                <S.ChatTime>{chat.time}</S.ChatTime>
              </S.ChatTop>
              <S.ChatMessage>{chat.message}</S.ChatMessage>
            </S.ChatInfo>

            {pressedId === chat.id && (
              <S.LeaveButton
                onClick={(e) => {
                  e.stopPropagation();
                  setPressedId(null);
                  setSelectedChat(chat);
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
        <ConfirmModal
          title={"채팅방을 나가면 파티도 탈퇴되고\n대화내역이 모두 삭제됩니다."}
          subTitle="파티를 탈퇴하시겠습니까?"
          confirmLabel="탈퇴하기"
          confirmingLabel="탈퇴 중..."
          onCancel={closeLeaveModal}
          onConfirm={handleLeaveConfirm}
          submitting={leaving}
          error={leaveError}
        />
      )}
    </S.Container>
  );
}

export default ChatList;
