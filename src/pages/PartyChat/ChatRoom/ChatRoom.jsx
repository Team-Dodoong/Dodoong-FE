import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useChatRoom } from "../../../hooks/useChatRoom";
import * as S from "./ChatRoom.style";
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal";
import defaultAvatar from "../../../assets/character_두비.png";
import { getChatHistory, getChatRooms } from "../../../api/chatApi";
import { leaveParty } from "../../../api/partyApi";
import { getMyInfo } from "../../../api/memberApi";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];
const OTHER_MESSAGE_LINE_LENGTH = 15;

const breakEveryNChars = (text, size) => {
  if (!text) return text;
  const lines = [];
  for (let i = 0; i < text.length; i += size) {
    lines.push(text.slice(i, i + size));
  }
  return lines.join("\n");
};

const formatDateDivider = (isoString) => {
  const date = new Date(isoString);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${WEEKDAYS[date.getDay()]}요일`;
};

const mapMessage = (m) => ({
  id: m.messageId,
  type: m.isMine ? "me" : "other",
  name: m.senderNickname ?? "알 수 없음",
  avatar: m.senderProfileImageUrl ?? defaultAvatar,
  text: m.content,
  createdAt: m.createAt,
});

const sortByTime = (list) =>
  [...list].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

function ChatRoom() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [roomInfo, setRoomInfo] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasNext, setHasNext] = useState(false);
  const [nextCursor, setNextCursor] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [input, setInput] = useState("");
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [leaveError, setLeaveError] = useState(null);
  const bottomRef = useRef(null);
  const syncedRealtimeCountRef = useRef(0);
  const {
    messages: realtimeMessages,
    sendMessage,
    isConnected,
  } = useChatRoom(Number(roomId));
  const [myId, setMyId] = useState(null);

  useEffect(() => {
    let ignore = false;

    const loadMyId = async () => {
      try {
        const response = await getMyInfo();
        const data = response.data || response;
        if (!ignore) setMyId(data?.id ?? null);
      } catch (err) {
        if (!ignore) console.error("내 정보 조회 실패", err);
      }
    };

    loadMyId();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const [roomsRes, historyRes] = await Promise.all([
          getChatRooms(),
          getChatHistory(roomId, { size: 30 }),
        ]);
        if (ignore) return;
        const room = roomsRes.data.data.find(
          (r) => r.partyId === Number(roomId),
        );
        setRoomInfo(
          room ? { name: room.partyName, count: room.memberCount } : null,
        );
        const history = historyRes.data.data;
        const mapped = history.messages.map(mapMessage);
        setMessages(sortByTime(mapped));
        setHasNext(history.hasNext);
        setNextCursor(history.nextCursor);
      } catch (err) {
        if (!ignore) {
          console.error("채팅 내역 조회 실패", err);
          setError("채팅 내역을 불러오지 못했습니다.");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    load();
    return () => {
      ignore = true;
    };
  }, [roomId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleLoadMore = async () => {
    if (!hasNext || loadingMore) return;
    setLoadingMore(true);
    try {
      const response = await getChatHistory(roomId, {
        cursor: nextCursor,
        size: 30,
      });
      const history = response.data.data;
      setMessages((prev) =>
        sortByTime([...prev, ...history.messages.map(mapMessage)]),
      );
      setHasNext(history.hasNext);
      setNextCursor(history.nextCursor);
    } catch (err) {
      console.error("이전 메시지 조회 실패", err);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    const newOnes = realtimeMessages.slice(syncedRealtimeCountRef.current);
    syncedRealtimeCountRef.current = realtimeMessages.length;
    if (newOnes.length === 0) return;

    const mapped = newOnes.map((m) => ({
      id: m.messageId,
      type: m.senderId === myId ? "me" : "other",
      name: m.senderNickname,
      avatar: m.senderProfileImageUrl ?? defaultAvatar,
      text: m.content,
      createdAt: m.createdAt,
    }));
    setMessages((prev) => sortByTime([...prev, ...mapped]));
  }, [realtimeMessages, myId]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleLeaveConfirm = async () => {
    setLeaving(true);
    setLeaveError(null);
    try {
      await leaveParty(roomId);
      navigate("/party/chat");
    } catch (err) {
      console.error("파티 탈퇴 실패", err);
      setLeaveError(err.response?.data?.message ?? "파티 탈퇴에 실패했습니다.");
    } finally {
      setLeaving(false);
    }
  };

  const displayItems = [];
  let lastDateKey = null;
  messages.forEach((msg) => {
    const dateKey = new Date(msg.createdAt).toDateString();
    if (dateKey !== lastDateKey) {
      displayItems.push({
        id: `date-${dateKey}`,
        kind: "date",
        text: formatDateDivider(msg.createdAt),
      });
      lastDateKey = dateKey;
    }
    displayItems.push({ ...msg, kind: msg.type });
  });

  return (
    <S.Container>
      <S.Header>
        <S.BackIcon onClick={() => navigate(-1)} />
        <S.HeaderInfo>
          <S.HeaderTitle>{roomInfo?.name}</S.HeaderTitle>
          <S.HeaderCount>{roomInfo?.count}</S.HeaderCount>
        </S.HeaderInfo>
        <S.ExitIcon onClick={() => setShowLeaveModal(true)} />
      </S.Header>

      <S.MessageList>
        {loading && <S.NoticeText>불러오는 중...</S.NoticeText>}
        {error && <S.NoticeText>{error}</S.NoticeText>}
        {hasNext && (
          <S.NoticeText onClick={handleLoadMore} style={{ cursor: "pointer" }}>
            {loadingMore ? "불러오는 중..." : "이전 대화 더 불러오기"}
          </S.NoticeText>
        )}
        {displayItems.map((item) => {
          if (item.kind === "date") {
            return <S.DateText key={item.id}>{item.text}</S.DateText>;
          }
          if (item.kind === "me") {
            return (
              <S.MyMessageRow key={item.id}>
                <S.MyBubble>{item.text}</S.MyBubble>
              </S.MyMessageRow>
            );
          }
          return (
            <S.OtherMessageRow key={item.id}>
              <S.Avatar src={item.avatar} alt={item.name} />
              <S.OtherContent>
                <S.OtherName>{item.name}</S.OtherName>
                <S.OtherBubble>
                  {breakEveryNChars(item.text, OTHER_MESSAGE_LINE_LENGTH)}
                </S.OtherBubble>
              </S.OtherContent>
            </S.OtherMessageRow>
          );
        })}
        <div ref={bottomRef} />
      </S.MessageList>

      <S.ScrollButton
        onClick={() =>
          bottomRef.current?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <S.ChevronIcon />
      </S.ScrollButton>

      <S.InputWrapper>
        <S.Input
          placeholder="메세지를 입력해주세요."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <S.SendButton onClick={handleSend} $active={!!input.trim()}>
          <S.SendIcon />
        </S.SendButton>
      </S.InputWrapper>

      {showLeaveModal && (
        <ConfirmModal
          title={"채팅방을 나가면 파티도 탈퇴되고\n대화내역이 모두 삭제됩니다."}
          subTitle="파티를 탈퇴하시겠습니까?"
          confirmLabel="탈퇴하기"
          confirmingLabel="탈퇴 중..."
          onCancel={() => {
            setShowLeaveModal(false);
            setLeaveError(null);
          }}
          onConfirm={handleLeaveConfirm}
          submitting={leaving}
          error={leaveError}
        />
      )}
    </S.Container>
  );
}

export default ChatRoom;
