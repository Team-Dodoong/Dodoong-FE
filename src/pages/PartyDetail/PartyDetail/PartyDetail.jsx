import { useParams, useNavigate } from "react-router-dom";
import * as S from "./PartyDetail.style";
import CtaButton from "../../../components/Button/CtaButton";

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
  const navigate = useNavigate();
  const { partyId } = useParams();
  const detail = MOCK_DETAIL.id === Number(partyId) ? MOCK_DETAIL : null;

  return (
    <S.Container>
      <S.ScrollArea>
        <S.ImageSection>
          <S.CoverImage src={detail.image} alt="cover" />
          <S.ImageOverlay />
          <S.HeaderIcons>
            <S.BackIcon onClick={() => navigate(-1)} />
            <S.HeaderRight>
              <S.ChatIcon />
              <S.ShareIcon />
              <S.MoreIcon />
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

        <S.Body>
          <S.Section>
            <S.SectionTitle>파티 소개</S.SectionTitle>
            <S.SectionContent>{detail.introduction}</S.SectionContent>
          </S.Section>

          <S.SectionDivider />

          <S.Section>
            <S.SectionTitle>파티 지정퀘스트</S.SectionTitle>
            <S.QuestItem>
              <S.QuestIcon />
              <S.QuestText>{detail.quest}</S.QuestText>
            </S.QuestItem>
          </S.Section>
        </S.Body>
      </S.ScrollArea>

      <CtaButton $variant="bottom" text="파티 신청하기" />
    </S.Container>
  );
}

export default PartyDetail;
