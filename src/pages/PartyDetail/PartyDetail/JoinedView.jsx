import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as S from "./JoinedView.style";
import CtaButton from "../../../components/Button/CtaButton";
import {
  getPartyMonthlyStats,
  getPartyVerifications,
  submitVerification,
} from "../../../api/partyApi";

function JoinedView({ detail }) {
  const navigate = useNavigate();
  const { partyId } = useParams();
  const [isVerified, setIsVerified] = useState(false);
  const [showVerifySheet, setShowVerifySheet] = useState(false);
  const [sheetChecked, setSheetChecked] = useState(false);
  const [verifyImage, setVerifyImage] = useState(null);
  const [verifyImageFile, setVerifyImageFile] = useState(null);
  const [verifyError, setVerifyError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const imageInputRef = useRef(null);
  const [monthlyStats, setMonthlyStats] = useState(null);
  const [verifications, setVerifications] = useState([]);

  const loadVerifications = useCallback(async () => {
    try {
      const response = await getPartyVerifications(partyId);
      setVerifications(response.data.data.verifications ?? []);
    } catch (err) {
      console.error("인증 기록 조회 실패", err);
    }
  }, [partyId]);

  useEffect(() => {
    let ignore = false;

    const loadMonthlyStats = async () => {
      try {
        const response = await getPartyMonthlyStats(partyId);
        if (!ignore) setMonthlyStats(response.data.data);
      } catch (err) {
        console.error("월간 통계 조회 실패", err);
      }
    };

    loadMonthlyStats();
    loadVerifications();
    return () => {
      ignore = true;
    };
  }, [partyId, loadVerifications]);

  const recordPreview = verifications
    .filter((v) => v.verified && v.imageUrl)
    .slice(0, 4);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVerifyImage(URL.createObjectURL(file));
      setVerifyImageFile(file);
    }
  };

  const closeVerifySheet = () => {
    setShowVerifySheet(false);
    setVerifyImage(null);
    setVerifyImageFile(null);
    setSheetChecked(false);
    setVerifyError(null);
  };

  const handleSubmit = async () => {
    if (!verifyImageFile) {
      setVerifyError("인증 이미지가 필요합니다.");
      return;
    }

    setSubmitting(true);
    setVerifyError(null);
    try {
      await submitVerification(partyId, verifyImageFile);
      setIsVerified(sheetChecked);
      setMonthlyStats((prev) =>
        prev
          ? {
              ...prev,
              todayQuestCompleted: true,
              monthlyParticipationCount: prev.monthlyParticipationCount + 1,
            }
          : prev,
      );
      loadVerifications();
      closeVerifySheet();
    } catch (err) {
      console.error("인증 제출 실패", err);
      setVerifyError(
        err.response?.data?.message ?? "인증 제출에 실패했습니다.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <S.StatsRow>
        <S.StatItem>
          <S.StatBackground>
            <S.TrophyIcon />
          </S.StatBackground>
          <S.StatLabel>월간 랭킹</S.StatLabel>
          <S.StatValue>
            {monthlyStats ? `${monthlyStats.rank}위` : "-"}
          </S.StatValue>
        </S.StatItem>
        <S.StatItem>
          <S.StatBackground>
            <S.FireIcon />
          </S.StatBackground>
          <S.StatLabel>연속 달성</S.StatLabel>
          <S.StatValue>
            {monthlyStats?.todayQuestCompleted ? "1일" : "-"}
          </S.StatValue>
        </S.StatItem>
        <S.StatItem>
          <S.StatBackground>
            <S.DartIcon />
          </S.StatBackground>
          <S.StatLabel>퀘스트 달성</S.StatLabel>
          <S.StatValue>
            {monthlyStats
              ? monthlyStats.todayQuestCompleted
                ? "완료"
                : "미완료"
              : "-"}
          </S.StatValue>
        </S.StatItem>
        <S.StatItem>
          <S.StatBackground>
            <S.SmileIcon />
          </S.StatBackground>
          <S.StatLabel>월별 인증 횟수</S.StatLabel>
          <S.StatValue>
            {monthlyStats ? `${monthlyStats.monthlyParticipationCount}회` : "-"}
          </S.StatValue>
        </S.StatItem>
      </S.StatsRow>
      <S.StatDivider />
      <S.Body>
        <S.QuestCtaGroup>
          <S.Section>
            <S.SectionTitle>파티 지정퀘스트 현황</S.SectionTitle>
            <S.QuestItem>
              {isVerified ? <S.QuestIcon /> : <S.EmptyCheckbox />}
              <S.QuestText>{detail.quest}</S.QuestText>
            </S.QuestItem>
          </S.Section>

          <CtaButton text="인증하기" onClick={() => setShowVerifySheet(true)} />
        </S.QuestCtaGroup>

        <S.SectionDivider />

        <S.Section>
          <S.SectionTitle>파티 소개</S.SectionTitle>
          <S.SectionContent>{detail.introduction}</S.SectionContent>
        </S.Section>

        <S.SectionDivider />

        <S.Section>
          <S.RecordHeader>
            <S.SectionTitle>인증기록</S.SectionTitle>
            <S.RecordMore
              onClick={() => navigate(`/party/${partyId}/certified`)}
            >
              <S.MoreText>전체보기</S.MoreText>
              <S.MoreIcon />
            </S.RecordMore>
          </S.RecordHeader>
          <S.RecordRow>
            {recordPreview.map((record) => (
              <S.RecordImage
                key={record.verificationId}
                src={record.imageUrl}
                alt={record.nickname}
              />
            ))}
          </S.RecordRow>
        </S.Section>
      </S.Body>

      {showVerifySheet && (
        <>
          <S.Overlay onClick={closeVerifySheet} />
          <S.VerifySheet>
            <S.MenuHandle />
            <S.VerifyTitle>인증 사진을 올려주세요</S.VerifyTitle>
            <S.VerifySubTitle>
              파티퀘스트를 완료한 인증 사진 1장을 업로드해주세요.
            </S.VerifySubTitle>

            <S.QuestItem onClick={() => setSheetChecked(!sheetChecked)}>
              {sheetChecked ? <S.QuestIcon /> : <S.EmptyCheckbox />}
              <S.QuestText>{detail.quest}</S.QuestText>
            </S.QuestItem>

            <S.VerifyImageBox onClick={() => imageInputRef.current.click()}>
              {verifyImage ? (
                <S.VerifyPreview src={verifyImage} alt="preview" />
              ) : (
                <>
                  <S.CameraIcon />
                  <S.VerifyImageLabel>사진을 추가해주세요</S.VerifyImageLabel>
                  <S.VerifyImageSub>
                    갤러리에서 선택하거나 카메라로 촬영할 수 있어요.
                  </S.VerifyImageSub>
                </>
              )}
            </S.VerifyImageBox>

            <input
              type="file"
              accept="image/*"
              ref={imageInputRef}
              style={{ display: "none" }}
              onChange={handleImageChange}
            />

            <S.VerifyNotice>
              <S.VerifyNoticeItem>
                사진은 되도록 선명하게 보이도록 촬영해주세요.
              </S.VerifyNoticeItem>
              <S.VerifyNoticeItem>
                첨부 가능한 파일 형식은 JPG, PNG 이며, 최대 10MB까지 가능해요.
              </S.VerifyNoticeItem>
            </S.VerifyNotice>

            {verifyError && <S.ErrorMessage>{verifyError}</S.ErrorMessage>}

            <S.ButtonWrapper>
              <S.ApplyButton $cancel onClick={closeVerifySheet}>
                취소
              </S.ApplyButton>
              <S.ApplyButton onClick={handleSubmit} disabled={submitting}>
                {submitting ? "제출 중..." : "제출하기"}
              </S.ApplyButton>
            </S.ButtonWrapper>
          </S.VerifySheet>
        </>
      )}
    </>
  );
}

export default JoinedView;
