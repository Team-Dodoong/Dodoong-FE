import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./OnBoarding.style";
import Input from "../../components/Input/Input";
import CtaButton from "../../components/Button/CtaButton";

export default function OnBoarding() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

// Form States
  const [agreements, setAgreements] = useState({
    all: false,
    term1: false,
    term2: false,
    term3: false,
  });

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  // Validation States
  const [idError, setIdError] = useState(false);
  const [pwError, setPwError] = useState(false);

  const handleRegisterComplete = () => {
    console.log("회원가입 완료");
    navigate("/");
  };

  // 약관 동의

  const isRequiredAgreed =
  agreements.term1 &&
  agreements.term2 ;

  const handleAgreeAll = () => {
    const nextValue = !agreements.all;
    setAgreements({
      all: nextValue,
      term1: nextValue,
      term2: nextValue,
      term3: nextValue,
    });
  };

  const handleTermChange = (key) => {
    const nextTerms = {
      ...agreements,
      [key]: !agreements[key],
    };

    nextTerms.all =
      nextTerms.term1 &&
      nextTerms.term2 &&
      nextTerms.term3;

    setAgreements(nextTerms);
  };

  // 뒤로가기
  const handleBack = () => {
    if (step === 1) {
      navigate("/"); // Login 페이지
    } else {
      setStep((prev) => prev - 1);
    }
  };


return (
    <S.Container>
        <S.NavBar>
          <S.BackButton onClick={handleBack}>
            <S.BackIcon />
          </S.BackButton>
        </S.NavBar>

      <S.ContentWrapper>

{/* ================= STEP 1: 약관 동의 ================= */}
        {step === 1 && (
          <S.StepWrapper>
            <S.StepZeroTitle>서비스 가입을 위해<br />아래 항목에 동의해주세요</S.StepZeroTitle>
            
            <S.TermsContainer>
              <S.TermRow isHeader onClick={handleAgreeAll}>
                <S.CheckIcon checked={agreements.all} />
                <S.TermText isHeader>아래 내용에 모두 동의합니다.</S.TermText>
              </S.TermRow>
              
              <S.Divider />

              <S.TermRow onClick={() => handleTermChange('term1')}>
                <S.CheckIcon checked={agreements.term1} />
                <S.TermText>[필수] 서비스 이용 약관</S.TermText>
                <S.ArrowIcon />
              </S.TermRow>

              <S.TermRow onClick={() => handleTermChange('term2')}>
                <S.CheckIcon checked={agreements.term2} />
                <S.TermText>[필수] 개인정보 수집 및 이용 동의</S.TermText>
                <S.ArrowIcon />
              </S.TermRow>

              <S.TermRow onClick={() => handleTermChange('term3')}>
                <S.CheckIcon checked={agreements.term3} />
                <S.TermText>[선택] 서비스의 유용한 소식 받기</S.TermText>
                <S.ArrowIcon />
              </S.TermRow>
              <S.SubDescription>
                업데이트, 이벤트 등 도움되는 정보를 받아볼 수 있어요.<br />선택하지 않아도 서비스를 이용할 수 있어요.
              </S.SubDescription>
            </S.TermsContainer>

            <CtaButton disabled={!isRequiredAgreed} $variant="bottom" onClick={() => setStep(2)}>동의 후 계속하기</CtaButton>
          </S.StepWrapper>
        )}

        {/* ================= STEP 2: 가입정보 입력 ================= */}
        {step === 2 && (
          <S.StepWrapper>
            <S.Title>가입정보를 입력해주세요</S.Title>
            
            <S.InputFormSection>
              <S.InputLabel>아이디</S.InputLabel>
              <Input 
                placeholder="아이디를 입력해 주세요" 
                value={id} 
                onChange={(e) => setId(e.target.value)}
                isError={idError}
              />
              {idError && <S.ErrorMessage>*중복된 아이디입니다</S.ErrorMessage>}

              <S.InputLabel style={{ marginTop: '24px' }}>비밀번호</S.InputLabel>
              <Input 
                type="password" 
                placeholder="비밀번호를 입력해 주세요" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
              />

              <Input 
                type="password" 
                placeholder="비밀번호 재확인" 
                value={passwordCheck} 
                onChange={(e) => setPasswordCheck(e.target.value)}
                isError={pwError}
                $marginTop="12px"
              />
              {pwError && <S.ErrorMessage>*비밀번호가 일치하지 않습니다</S.ErrorMessage>}
            </S.InputFormSection>

            {/* 테스트를 위해 클릭 시 에러 분기가 토글되도록 임시 처리 가능 */}
            <CtaButton $variant="bottom" onClick={() => setStep(3)}>입력완료</CtaButton>
          </S.StepWrapper>
        )}

        {/* ================= STEP 3: 프로필 설정 ================= */}
        {step === 3 && (
          <S.StepWrapper>
            <S.Title>회원가입 완료!<br />프로필을 설정해볼까요?</S.Title>
            
            <S.ProfileImageContainer>
              <S.ProfileCircle />
              <S.CameraBadge>
                <S.CameraIcon />
              </S.CameraBadge>
            </S.ProfileImageContainer>

            <S.InputFormSection>
              <S.InputLabel>닉네임</S.InputLabel>
              <Input placeholder="아이디를 입력해 주세요" />

              <S.InputLabel style={{ marginTop: '24px' }}>나의 소개글</S.InputLabel>
              <Input 
                as="textarea"
                placeholder="소개글을 입력해 주세요" 
                $height="153px" 
              />
            </S.InputFormSection>

            <CtaButton $variant="bottom" onClick={handleRegisterComplete}>가입완료</CtaButton>
          </S.StepWrapper>
        )}

      </S.ContentWrapper>
    </S.Container>
  );
}