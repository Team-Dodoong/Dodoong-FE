import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as S from "./PartyDetail.style";
import NotJoinedView from "./NotJoinedView";
import JoinedView from "./JoinedView";

const MOCK_DETAIL = {
  id: 1,
  status: "모집중",
  tags: ["공부", "취업"],
  title: "공부종류 상관없이 스터디원 모집",
  isLocked: true,
  members: "22/50",
  time: "32분 전",
  image: "https://picsum.photos/seed/study/600/300",
  introduction: `🌱 함께 공부할 사람 모집합니다!
혼자 공부하면 금방 지치고 미루게 된다면 같이 해요 🙌
공부 종류는 상관없어요! 시험 준비, 자격증, 과제, 취업 준비, 독서 등 각자 목표를 가지고 자유롭게 공부하는 스터디입니다.

✅ 서로 인증하며 꾸준히 공부하기
✅ 가끔 소통하며 동기부여 받기
✅ 부담 없는 분위기

열심히 공부할 의지만 있다면 누구나 환영합니다 😊`,
  quest: ["매일 8시에 스터디 인증창에 인증하기"],
};

function PartyDetail() {
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showApplyMenu, setShowApplyMenu] = useState(false);
  const [showPasswordMenu, setShowPasswordMenu] = useState(false);
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const { partyId } = useParams();
  const detail = MOCK_DETAIL.id === Number(partyId) ? MOCK_DETAIL : null;
  const isJoined = true;

  return (
    <S.Container>
      <S.ScrollArea>
        <S.ImageSection>
          <S.CoverImage src={detail.image} alt="cover" />
          <S.ImageOverlay />
          <S.HeaderIcons>
            <S.BackIcon onClick={() => navigate(-1)} />
            <S.HeaderRight>
              <S.ChatIcon onClick={() => navigate(`/party/chat/${partyId}`)} />
              <S.ShareIcon />
              <S.MoreIcon onClick={() => setShowMoreMenu(true)} />
            </S.HeaderRight>
          </S.HeaderIcons>
          <S.ImageContent>
            <S.TagRow>
              <S.StatusTag>{detail.status}</S.StatusTag>
              {detail.tags.map((tag, i) => (
                <S.Tag key={i}>{tag}</S.Tag>
              ))}
            </S.TagRow>
            <S.Title>
              <S.LockIcon />
              {detail.title}
            </S.Title>
            <S.MetaRow>
              <S.SocialIcon />
              <S.MemberCount>{detail.members}</S.MemberCount>
              <S.Divider />
              <S.LastConversation>
                마지막 대화 <S.TimeHighlight>{detail.time}</S.TimeHighlight>
              </S.LastConversation>
            </S.MetaRow>
          </S.ImageContent>
        </S.ImageSection>

        {isJoined ? (
          <JoinedView detail={detail} />
        ) : (
          <NotJoinedView detail={detail} />
        )}
      </S.ScrollArea>

      {isJoined && (
        <S.RankingButton onClick={() => navigate(`/party/${partyId}/ranking`)}>
          <S.RankIcon />
        </S.RankingButton>
      )}

      {showMoreMenu && (
        <>
          <S.Overlay $menu onClick={() => setShowMoreMenu(false)} />
          <S.MenuContainer>
            <S.MenuItem onClick={() => setShowMoreMenu(false)}>
              파티 숨기기
            </S.MenuItem>
            <S.MenuDivider />
            <S.MenuItem $report onClick={() => setShowMoreMenu(false)}>
              신고하기
            </S.MenuItem>
          </S.MenuContainer>
        </>
      )}
    </S.Container>
  );
}

export default PartyDetail;
