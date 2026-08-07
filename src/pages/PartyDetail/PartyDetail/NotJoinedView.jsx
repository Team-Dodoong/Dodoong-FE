import { useState } from "react";
import * as S from "./NotJoinedView.style";
import CtaButton from "../../../components/Button/CtaButton";
import { joinParty } from "../../../api/partyApi";

function NotJoinedView({ detail, onJoined }) {
  const [showApplyMenu, setShowApplyMenu] = useState(false);
  const [showPasswordMenu, setShowPasswordMenu] = useState(false);
  const [value, setValue] = useState("");
  const [joining, setJoining] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleJoin = async (partyPassword) => {
    setJoining(true);
    try {
      const response = await joinParty(detail.id, partyPassword);
      alert(`"${response.data.data.partyName}" 파티에 가입되었습니다.`);
      setShowApplyMenu(false);
      setShowPasswordMenu(false);
      setValue("");
      setPasswordError(false);
      onJoined?.();
    } catch (err) {
      if (showPasswordMenu) {
        setPasswordError(true);
      } else {
        alert(err.response?.data?.message ?? "파티 가입에 실패했습니다.");
      }
    } finally {
      setJoining(false);
    }
  };

  const handleApply = () => {
    if (detail.isLocked) {
      setShowApplyMenu(false);
      setPasswordError(false);
      setShowPasswordMenu(true);
    } else {
      handleJoin(null);
    }
  };

  const closePasswordMenu = () => {
    setShowPasswordMenu(false);
    setValue("");
    setPasswordError(false);
  };

  return (
    <>
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

      <CtaButton
        $variant="bottom"
        text="파티 신청하기"
        onClick={() => setShowApplyMenu(true)}
      />

      {showApplyMenu && (
        <>
          <S.Overlay />
          <S.ApplyContainer>
            <S.ApplyTitle>
              [ {detail.title} ]
              <S.ApplySubTitle>파티에 가입신청 할까요?</S.ApplySubTitle>
            </S.ApplyTitle>
            <S.ButtonWrapper>
              <S.ApplyButton $cancel onClick={() => setShowApplyMenu(false)}>
                취소
              </S.ApplyButton>
              <S.ApplyButton onClick={handleApply} disabled={joining}>
                가입신청
              </S.ApplyButton>
            </S.ButtonWrapper>
          </S.ApplyContainer>
        </>
      )}

      {detail.isLocked && showPasswordMenu && (
        <>
          <S.Overlay />
          <S.ApplyContainer>
            <S.ApplySubTitle>
              해당 파티는 비공개 파티입니다.
              <br /> 비밀번호를 입력해주세요.
            </S.ApplySubTitle>
            <S.PasswordInput
              type="number"
              value={value}
              onChange={(e) => {
                if (e.target.value.length <= 4) setValue(e.target.value);
                setPasswordError(false);
              }}
              maxLength={4}
              $isError={passwordError}
            />
            <S.ErrorMessage $show={passwordError}>
              *비밀번호가 일치하지 않습니다
            </S.ErrorMessage>
            <S.ButtonWrapper>
              <S.ApplyButton $cancel onClick={closePasswordMenu}>
                취소
              </S.ApplyButton>
              <S.ApplyButton
                onClick={() => handleJoin(value)}
                disabled={joining || value.length !== 4}
              >
                가입신청
              </S.ApplyButton>
            </S.ButtonWrapper>
          </S.ApplyContainer>
        </>
      )}
    </>
  );
}

export default NotJoinedView;
