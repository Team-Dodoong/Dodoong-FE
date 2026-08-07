import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as S from "./PartyDetail.style";
import NotJoinedView from "./NotJoinedView";
import JoinedView from "./JoinedView";
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal";
import { getPartyDetail, leaveParty, deleteParty } from "../../../api/partyApi";
import { getPartyImage } from "../../../utils/partyImage";
import defaultPartyImage from "../../../assets/img_party_background_basic.png";

const CATEGORY_LABELS = {
  STUDY: "공부",
  CAREER: "취업",
  DAILY: "일상",
  LANGUAGE: "외국어",
  FITNESS: "운동",
};

function PartyDetail() {
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const navigate = useNavigate();
  const { partyId } = useParams();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [leaveError, setLeaveError] = useState(null);

  const applyDetail = (party) =>
    setDetail({
      id: party.id,
      status: party.isRecruiting ? "모집중" : "마감",
      tags: party.categories.map((cat) => CATEGORY_LABELS[cat] ?? cat),
      title: party.name,
      isLocked: !party.isPublic,
      members: `${party.currentMembers}/${party.maxMembers}`,
      image: getPartyImage(party.imageUrl, defaultPartyImage),
      introduction: party.description,
      quest: party.questContent,
      isJoined: party.isJoined,
      isOwner: party.isOwner,
    });

  useEffect(() => {
    let ignore = false;

    const loadDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getPartyDetail(partyId);
        if (ignore) return;
        applyDetail(response.data.data);
      } catch (err) {
        if (!ignore) {
          console.error("파티 상세 조회 실패", err);
          setError("파티 정보를 불러오지 못했습니다.");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadDetail();
    return () => {
      ignore = true;
    };
  }, [partyId]);

  const refetchDetail = useCallback(async () => {
    try {
      const response = await getPartyDetail(partyId);
      applyDetail(response.data.data);
    } catch (err) {
      console.error("파티 상세 재조회 실패", err);
    }
  }, [partyId]);

  const closeLeaveModal = () => {
    setShowLeaveModal(false);
    setLeaveError(null);
  };

  const handleLeaveConfirm = async () => {
    setLeaving(true);
    setLeaveError(null);
    try {
      await leaveParty(partyId);
      navigate("/party");
    } catch (err) {
      console.error("파티 탈퇴 실패", err);
      setLeaveError(err.response?.data?.message ?? "파티 탈퇴에 실패했습니다.");
    } finally {
      setLeaving(false);
    }
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteError(null);
  };

  const handleDeleteConfirm = async () => {
    setDeleting(true);
    setDeleteError(null);
    try {
      await deleteParty(partyId);
      navigate("/party");
    } catch (err) {
      console.error("파티 삭제 실패", err);
      setDeleteError(err.response?.data?.message ?? "파티 삭제에 실패했습니다.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <S.Container>
        <S.Body>불러오는 중...</S.Body>
      </S.Container>
    );
  }

  if (error || !detail) {
    return (
      <S.Container>
        <S.Body>{error ?? "파티를 찾을 수 없습니다."}</S.Body>
      </S.Container>
    );
  }

  return (
    <S.Container $full={detail.isJoined}>
      <S.ScrollArea $full={detail.isJoined}>
        <S.ImageSection>
          <S.CoverImage src={detail.image} alt="cover" />
          <S.ImageOverlay />
          <S.HeaderIcons>
            <S.BackIcon onClick={() => navigate(-1)} />
            <S.HeaderRight>
              <S.ChatIcon
                onClick={
                  detail.isJoined
                    ? () => navigate(`/party/chat/${partyId}`)
                    : undefined
                }
              />
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
              {detail.isLocked && <S.LockIcon />}
              {detail.title}
            </S.Title>
            <S.MetaRow>
              <S.SocialIcon />
              <S.MemberCount>{detail.members}</S.MemberCount>
            </S.MetaRow>
          </S.ImageContent>
        </S.ImageSection>

        {detail.isJoined ? (
          <JoinedView detail={detail} />
        ) : (
          <NotJoinedView detail={detail} onJoined={refetchDetail} />
        )}
      </S.ScrollArea>

      {detail.isJoined && (
        <S.RankingButton onClick={() => navigate(`/party/${partyId}/ranking`)}>
          <S.RankIcon />
        </S.RankingButton>
      )}

      {showMoreMenu && (
        <>
          <S.Overlay $menu onClick={() => setShowMoreMenu(false)} />
          <S.MenuContainer>
            {!detail.isJoined ? (
              <S.MenuItem onClick={() => setShowMoreMenu(false)}>
                파티 숨기기
              </S.MenuItem>
            ) : detail.isOwner ? (
              <>
                <S.MenuItem
                  onClick={() => {
                    setShowMoreMenu(false);
                    navigate(`/party/${partyId}/edit`);
                  }}
                >
                  파티 수정하기
                </S.MenuItem>
                <S.MenuDivider />
                <S.MenuItem
                  onClick={() => {
                    setShowMoreMenu(false);
                    setShowDeleteModal(true);
                  }}
                >
                  파티 삭제하기
                </S.MenuItem>
              </>
            ) : (
              <S.MenuItem
                onClick={() => {
                  setShowMoreMenu(false);
                  setShowLeaveModal(true);
                }}
              >
                파티 탈퇴하기
              </S.MenuItem>
            )}
            <S.MenuDivider />
            <S.MenuItem $report onClick={() => setShowMoreMenu(false)}>
              신고하기
            </S.MenuItem>
          </S.MenuContainer>
        </>
      )}

      {showDeleteModal && (
        <ConfirmModal
          title={"파티를 삭제하면 모든 데이터가\n영구적으로 삭제되며 복구할 수 없습니다."}
          subTitle="파티를 삭제하시겠습니까?"
          confirmLabel="삭제하기"
          confirmingLabel="삭제 중..."
          onCancel={closeDeleteModal}
          onConfirm={handleDeleteConfirm}
          submitting={deleting}
          error={deleteError}
        />
      )}

      {showLeaveModal && (
        <ConfirmModal
          title={"파티를 탈퇴하면 그동안의\n인증 기록과 랭킹이 모두 사라집니다."}
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

export default PartyDetail;
