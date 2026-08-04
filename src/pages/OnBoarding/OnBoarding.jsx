import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as S from "./OnBoarding.style";
import Input from "../../components/Input/Input";
import CtaButton from "../../components/Button/CtaButton";

import { 
  signup, 
  login, 
  getProfileUploadUrl, 
  updateProfile 
} from "../../api/memberApi";

export default function OnBoarding() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

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

  // Form States - Step 3 (프로필 정보)
  const [nickname, setNickname] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Validation States
  const [idError, setIdError] = useState(false);
  const [pwError, setPwError] = useState(false);
  const [loading, setLoading] = useState(false);

  // ================= Step 1: 약관 동의 관련 =================

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

  // ================= Step 2: 회원가입 요청 핸들러 =================
  const handleSignupNext = async () => {
    setIdError(false);
    setPwError(false);

    // 1. 비밀번호 일치 검사
    if (password !== passwordCheck) {
      setPwError(true);
      return;
    }

    if (!id || !password) {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      setLoading(true);

      // 2. 회원가입 API 호출
      await signup({ loginId: id, password: password });

      // 3. 프로필 설정을 위한 자동 로그인 (accessToken 쿠키 생성)
      await login({ loginId: id, password: password });

      // Step 3로 이동
      setStep(3);
    } catch (error) {
      // 아이디 중복 등의 에러 응답 처리
      if (error.response?.status === 400 || error.response?.status === 409) {
        setIdError(true);
      } else {
        alert(error.response?.data?.message || "회원가입 처리 중 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ================= Step 3: 프로필 이미지 및 제출 핸들러 =================
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // 미리보기 URL 생성
    }
  };

  const handleRegisterComplete = async () => {
    if (!nickname) {
      alert("닉네임을 입력해 주세요.");
      return;
    }

    try {
      setLoading(true);

      let profileImageKey = null;

      // 1. 이미지를 선택한 경우 Presigned URL 발급 및 S3 업로드 진행
      if (imageFile) {
        const contentType = imageFile.type;

        // (1) 업로드 URL & profileImageKey 발급 요청
        // POST /api/members/me/profile-image/upload-url
        const uploadUrlData = await getProfileUploadUrl(contentType);
        const { uploadUrl, profileImageKey: issuedKey } = uploadUrlData;

        // (2) 발급된 URL로 S3에 직접 이미지 바이너리 업로드
        await axios.put(uploadUrl, imageFile, {
          headers: {
            "Content-Type": contentType,
          },
        });

        profileImageKey = issuedKey;
      }

      // 2. 최종 프로필 업데이트 API 호출 (PATCH /api/members/me)
      await updateProfile({
        nickname,
        introduction: introduction || "", // 삭제/빈값일 경우 빈 문자열 전송
        profileImageKey,
      });

      alert("회원가입 및 프로필 설정이 완료되었습니다!");
      navigate("/"); // 메인/로그인 페이지로 이동
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "프로필 저장 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
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
              <S.TermRow $isHeader onClick={handleAgreeAll}>
                <S.CheckIcon checked={agreements.all} />
                <S.TermText $isHeader>아래 내용에 모두 동의합니다.</S.TermText>
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
                onChange={(e) => {
                  setId(e.target.value);
                  if (idError) setIdError(false);
                }}
                isError={idError}
              />
              {idError && <S.ErrorMessage>*중복된 아이디입니다</S.ErrorMessage>}

              <S.InputLabel style={{ marginTop: '24px' }}>비밀번호</S.InputLabel>
              <Input 
                type="password" 
                placeholder="비밀번호를 입력해 주세요" 
                value={password} 
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (pwError) setPwError(false);
                }}
              />

              <Input 
                type="password" 
                placeholder="비밀번호 재확인" 
                value={passwordCheck} 
                onChange={(e) => {
                  setPasswordCheck(e.target.value);
                  if (pwError) setPwError(false);
                }}
                isError={pwError}
                $marginTop="12px"
              />
              {pwError && <S.ErrorMessage>*비밀번호가 일치하지 않습니다</S.ErrorMessage>}
            </S.InputFormSection>

            <CtaButton
              $variant="bottom"
              onClick={handleSignupNext}
              disabled={loading}
            >
              {loading ? "처리 중..." : "입력완료"}
            </CtaButton>
          </S.StepWrapper>
        )}

        {/* ================= STEP 3: 프로필 설정 ================= */}
        {step === 3 && (
          <S.StepWrapper>
            <S.Title>회원가입 완료!<br />프로필을 설정해볼까요?</S.Title>
            
            {/* 프로필 이미지 선택 영역 */}
            <S.ProfileImageContainer onClick={() => fileInputRef.current?.click()}>
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="프로필 미리보기"
                  style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
                />
              ) : (
                <S.ProfileCircle />
              )}
              <S.CameraBadge>
                <S.CameraIcon />
              </S.CameraBadge>
            </S.ProfileImageContainer>

            {/* 숨겨진 File Input */}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleImageChange}
            />

            <S.InputFormSection>
              <S.InputLabel>닉네임</S.InputLabel>
              <Input
                placeholder="닉네임을 입력해 주세요"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />

              <S.InputLabel style={{ marginTop: '24px' }}>나의 소개글</S.InputLabel>
              <Input 
                as="textarea"
                placeholder="소개글을 입력해 주세요" 
                $height="153px" 
                value={introduction}
                onChange={(e) => setIntroduction(e.target.value)}
              />
            </S.InputFormSection>

            <CtaButton
              $variant="bottom"
              onClick={handleRegisterComplete}
              disabled={loading}
            >
              {loading ? "처리 중..." : "가입완료"}
            </CtaButton>
          </S.StepWrapper>
        )}

      </S.ContentWrapper>
    </S.Container>
  );
}