import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as S from "./ChatRoom.style";
import { MOCK_CHATS } from "../mockChats";
import LeaveModal from "../components/LeaveModal";
import { leaveParty } from "../../../api/partyApi";

const MOCK_MESSAGES = [
  { id: 1, type: "notice", text: "하하하렇렇커여등님이 입장하셨습니다." },
  { id: 2, type: "notice", text: "김이박님이 입장하셨습니다." },
  { id: 3, type: "date", text: "2026년 6월 17일 수요일" },
  { id: 4, type: "me", text: "안녕하세요! 알부탁드립니다." },
  {
    id: 5,
    type: "me",
    text: "메세지 최대 크기 메세지 최대 크기 메세지 최대 크기 메세지 최대 크기 메세지 최대 크기 메세지 최대 크기 메세지 최대 크기 메세지 최대 크기 메세지 최대 크기 메세지 최대 크기 메세지 최대 크기 메세지 최대 크기 메세지 최대 크기 메세지 최대 크기 메세지 최대 크기 메세지 최대 크기 메세지 최대 크기 메세지 최대 크기",
  },
  {
    id: 6,
    type: "other",
    name: "대학가고싶어용",
    avatar: "https://picsum.photos/seed/user1/100",
    text: "안녕하세요~ 잘지내보용",
  },
  {
    id: 7,
    type: "other",
    name: "대학가고싶어용",
    avatar: "https://picsum.photos/seed/user1/100",
    text: "ㄷㄱ!",
  },
];

function ChatRoom() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const chat = MOCK_CHATS.find((c) => c.id === Number(roomId));
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [input, setInput] = useState("");
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [leaveError, setLeaveError] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), type: "me", text: input.trim() },
    ]);
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

  return (
    <S.Container>
      <S.Header>
        <S.BackIcon onClick={() => navigate(-1)} />
        <S.HeaderInfo>
          <S.HeaderTitle>{chat?.name}</S.HeaderTitle>
          <S.HeaderCount>{chat?.count}</S.HeaderCount>
        </S.HeaderInfo>
        <S.ExitIcon onClick={() => setShowLeaveModal(true)} />
      </S.Header>

      <S.MessageList>
        {messages.map((msg) => {
          if (msg.type === "notice") {
            return <S.NoticeText key={msg.id}>{msg.text}</S.NoticeText>;
          }
          if (msg.type === "date") {
            return <S.DateText key={msg.id}>{msg.text}</S.DateText>;
          }
          if (msg.type === "me") {
            return (
              <S.MyMessageRow key={msg.id}>
                <S.MyBubble>{msg.text}</S.MyBubble>
              </S.MyMessageRow>
            );
          }
          if (msg.type === "other") {
            return (
              <S.OtherMessageRow key={msg.id}>
                <S.Avatar src={msg.avatar} alt={msg.name} />
                <S.OtherContent>
                  <S.OtherName>{msg.name}</S.OtherName>
                  <S.OtherBubble>{msg.text}</S.OtherBubble>
                </S.OtherContent>
              </S.OtherMessageRow>
            );
          }
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
        <LeaveModal
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
