import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as S from "./Certified.style";

const FILTER_OPTIONS = ["전체 멤버", "인증 멤버", "미인증 멤버"];

const MOCK_PARTY_ID = 1;

const MOCK_RECORDS = [
  {
    id: 1,
    name: "김민정",
    time: "오후 10:41",
    image: "https://picsum.photos/seed/a/100",
    certified: true,
  },
  {
    id: 2,
    name: "김예솔",
    time: "오후 09:28",
    image: "https://picsum.photos/seed/b/100",
    certified: true,
  },
  {
    id: 3,
    name: "김준석",
    time: "오후 10:41",
    image: "https://picsum.photos/seed/c/100",
    certified: true,
  },
  { id: 4, name: "도지영", time: "오후 10:41", image: null, certified: false },
  {
    id: 5,
    name: "마서영",
    time: "오후 10:41",
    image: "https://picsum.photos/seed/d/100",
    certified: true,
  },
  {
    id: 6,
    name: "박지원",
    time: "오후 10:41",
    image: "https://picsum.photos/seed/e/100",
    certified: true,
  },
  { id: 7, name: "박준영", time: "오후 10:41", image: null, certified: false },
  { id: 8, name: "박한별", time: "오후 10:41", image: null, certified: false },
  { id: 9, name: "박한별", time: "오후 10:41", image: null, certified: false },
  { id: 10, name: "박한별", time: "오후 10:41", image: null, certified: false },
  { id: 11, name: "박한별", time: "오후 10:41", image: null, certified: false },
  { id: 12, name: "박한별", time: "오후 10:41", image: null, certified: false },
];

function Certified() {
  const navigate = useNavigate();
  const { partyId } = useParams();
  const [selectedFilter, setSelectedFilter] = useState("전체 멤버");
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const records = Number(partyId) === MOCK_PARTY_ID ? MOCK_RECORDS : [];

  const filteredRecords = records.filter((record) => {
    if (selectedFilter === "인증 멤버") return record.certified;
    if (selectedFilter === "미인증 멤버") return !record.certified;
    return true;
  });

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

          <S.Section>
            <S.SectionRow>
              <S.SectionTitle>오늘 인증 현황</S.SectionTitle>
              <S.DateText>2026. 06. 30</S.DateText>
            </S.SectionRow>
            <S.ProgressRow>
              <S.ProgressLabel>22/50</S.ProgressLabel>
              <S.ProgressPercent>73%</S.ProgressPercent>
            </S.ProgressRow>
            <S.ProgressBar>
              <S.ProgressFill $percent={73} />
            </S.ProgressBar>
          </S.Section>

          <S.DateSection>
            <S.DateLabel>07.02 (목) 22/50</S.DateLabel>
            <S.Grid>
              {filteredRecords.map((record) => (
                <S.RecordCard key={record.id}>
                  <S.MemberWrapper>
                    <S.ProfileImage
                      src="https://picsum.photos/seed/profile/100"
                      alt={record.name}
                    />
                    <S.MemberInfo>
                      <S.MemberName>{record.name}</S.MemberName>
                      <S.MemberTime>{record.time}</S.MemberTime>
                    </S.MemberInfo>
                  </S.MemberWrapper>
                  {record.image ? (
                    <S.CertImage src={record.image} alt="인증사진" />
                  ) : (
                    <S.PendingBox>인증{"\n"}대기중</S.PendingBox>
                  )}
                </S.RecordCard>
              ))}
            </S.Grid>
          </S.DateSection>
        </S.Body>
      </S.ScrollArea>
    </S.Container>
  );
}

export default Certified;
