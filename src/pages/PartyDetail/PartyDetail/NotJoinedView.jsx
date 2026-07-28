import { useState } from "react";
import * as S from "./PartyDetail.style";
import CtaButton from "../../../components/Button/CtaButton";

function NotJoinedView({ detail }) {
  const [showApplyMenu, setShowApplyMenu] = useState(false);
  const [showPasswordMenu, setShowPasswordMenu] = useState(false);
  const [value, setValue] = useState("");

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
              <S.ApplyButton
                onClick={() => {
                  setShowApplyMenu(false);
                  setShowPasswordMenu(true);
                }}
              >
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
              }}
              maxLength={4}
            />
            <S.ButtonWrapper>
              <S.ApplyButton $cancel onClick={() => setShowPasswordMenu(false)}>
                취소
              </S.ApplyButton>
              <S.ApplyButton onClick={() => setShowPasswordMenu(false)}>
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
