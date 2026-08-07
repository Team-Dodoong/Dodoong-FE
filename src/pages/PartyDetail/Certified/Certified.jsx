import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as S from "./Certified.style";
import { getPartyVerifications } from "../../../api/partyApi";

const FILTER_OPTIONS = ["전체 멤버", "인증 멤버", "미인증 멤버"];

const DAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"];

const formatDateText = (dateStr) => {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `${year}. ${month}. ${day}`;
};

const formatDateLabel = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(`${dateStr}T00:00:00`);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}.${day} (${DAY_LABELS[date.getDay()]})`;
};

const formatTime = (dateTimeStr) => {
  if (!dateTimeStr) return "";
  const date = new Date(dateTimeStr);
  return date.toLocaleTimeString("ko-KR", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

function Certified() {
  const navigate = useNavigate();
  const { partyId } = useParams();
  const [selectedFilter, setSelectedFilter] = useState("전체 멤버");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let ignore = false;

    const loadVerifications = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getPartyVerifications(partyId);
        if (!ignore) setData(response.data.data);
      } catch (err) {
        if (!ignore) {
          console.error("인증 기록 조회 실패", err);
          setError("인증 기록을 불러오지 못했습니다.");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadVerifications();
    return () => {
      ignore = true;
    };
  }, [partyId]);

  const records = data?.verifications ?? [];

  const filteredRecords = records.filter((record) => {
    if (selectedFilter === "인증 멤버") return record.verified;
    if (selectedFilter === "미인증 멤버") return !record.verified;
    return true;
  });

  const percent = data?.totalMemberCount
    ? Math.round((data.verifiedMemberCount / data.totalMemberCount) * 100)
    : 0;

  return (
    <S.Container>
      <S.Header>
        <S.BackIcon onClick={() => navigate(-1)} />
        <S.HeaderTitle>인증기록</S.HeaderTitle>
        <S.Placeholder />
      </S.Header>

      <S.ScrollArea>
        <S.Body>
          <S.FilterWrapper>
            <S.FilterButton onClick={() => setShowFilterMenu(!showFilterMenu)}>
              {selectedFilter}
              <S.ChevronIcon />
            </S.FilterButton>
            {showFilterMenu && (
              <>
                <S.Overlay onClick={() => setShowFilterMenu(false)} />
                <S.FilterMenu>
                  {FILTER_OPTIONS.map((option) => (
                    <S.FilterMenuItem
                      key={option}
                      $active={selectedFilter === option}
                      onClick={() => {
                        setSelectedFilter(option);
                        setShowFilterMenu(false);
                      }}
                    >
                      {option}
                      {selectedFilter === option && <S.CheckIcon />}
                    </S.FilterMenuItem>
                  ))}
                </S.FilterMenu>
              </>
            )}
          </S.FilterWrapper>

          {loading && <S.DateText>불러오는 중...</S.DateText>}
          {error && <S.DateText>{error}</S.DateText>}

          {data && (
            <>
              <S.Section>
                <S.SectionRow>
                  <S.SectionTitle>오늘 인증 현황</S.SectionTitle>
                  <S.DateText>{formatDateText(data.date)}</S.DateText>
                </S.SectionRow>
                <S.ProgressRow>
                  <S.ProgressLabel>
                    <S.MainColorLabel>
                      {data.verifiedMemberCount}
                    </S.MainColorLabel>
                    /{data.totalMemberCount}
                  </S.ProgressLabel>
                  <S.ProgressPercent>{percent}%</S.ProgressPercent>
                </S.ProgressRow>
                <S.ProgressBar>
                  <S.ProgressFill $percent={percent} />
                </S.ProgressBar>
              </S.Section>
              <S.Divider />
              <S.DateSection>
                <S.DateLabel>
                  {formatDateLabel(data.date)}{" "}
                  <S.DateSubLabel>
                    <S.MainColorLabel>
                      {data.verifiedMemberCount}
                    </S.MainColorLabel>
                    /{data.totalMemberCount}
                  </S.DateSubLabel>
                </S.DateLabel>
                <S.Grid>
                  {filteredRecords.map((record) => (
                    <S.RecordCard key={record.partyMemberId}>
                      <S.MemberWrapper>
                        <S.ProfileImage
                          src={
                            record.profileImageUrl ||
                            "https://picsum.photos/seed/profile/100"
                          }
                          alt={record.nickname}
                        />
                        <S.MemberInfo>
                          <S.MemberName>{record.nickname}</S.MemberName>
                          <S.MemberTime>
                            {record.verified
                              ? formatTime(record.verifiedAt)
                              : formatTime(now)}
                          </S.MemberTime>
                        </S.MemberInfo>
                      </S.MemberWrapper>
                      {record.verified && record.imageUrl ? (
                        <S.CertImage src={record.imageUrl} alt="인증사진" />
                      ) : (
                        <S.PendingBox>인증{"\n"}대기중</S.PendingBox>
                      )}
                    </S.RecordCard>
                  ))}
                </S.Grid>
              </S.DateSection>
            </>
          )}
        </S.Body>
      </S.ScrollArea>
    </S.Container>
  );
}

export default Certified;
