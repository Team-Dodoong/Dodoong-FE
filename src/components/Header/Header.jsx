import { useNavigate } from 'react-router-dom';
import ChatIcon from '../../assets/ic_chat_24.svg?react';
import * as S from './Header.style';

// 상단 공통 헤더 (로고 + 채팅 아이콘)
// Home 뿐 아니라 다른 페이지에서도 재사용할 수 있도록 common 컴포넌트(components 폴더)로 분리
function Header({ hasNewChat = true, onChatClick }) {
  const navigate = useNavigate();

  const handleChatClick = onChatClick ?? (() => navigate('/party/chat'));

  return (
    <S.Wrapper>
      <S.Logo>DoDoong!</S.Logo>
      <S.ChatButton type="button" onClick={handleChatClick} aria-label="채팅">
        <ChatIcon />
        {/* hasNewChat && <S.NotificationDot /> */}
      </S.ChatButton>
    </S.Wrapper>
  );
}


export default Header;
