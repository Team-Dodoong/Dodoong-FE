import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Login.style";
import Input from "../../components/Input/Input";
import CtaButton from "../../components/Button/CtaButton";
import { login } from "../../api/memberApi";
import { activateStomp } from "../../api/stompClient";

export default function Login() {
  const [step, setStep] = useState(0); // // -1: 로그인, 0: 메인
  const navigate = useNavigate(); // navigate 함수 생성

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  // const [passwordCheck, setPasswordCheck] = useState('');

  // Validation States (이미지에 있던 에러 메시지 구현용)
  const [idError, setIdError] = useState(false); // true일 때 *중복된 아이디입니다
  const [pwError, setPwError] = useState(false); // true일 때 *비밀번호가 일치하지 않습니다
  const [errorMessage, setErrorMessage] = useState(""); // 서버 에러 메시지 저장용
  const [loading, setLoading] = useState(false); // 로딩 상태

  // 입력값 변경 시 에러 초기화
  const handleIdChange = (e) => {
    setId(e.target.value);
    if (idError) setIdError(false);
    if (errorMessage) setErrorMessage("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (pwError) setPwError(false);
    if (errorMessage) setErrorMessage("");
  };

  // 2. 로그인 처리 함수 (async 적용)
  const handleLogin = async (e) => {
    if (e) e.preventDefault(); // 폼 제출 동작 방지

    // 간단한 프론트엔드 유효성 검사
    if (!id.trim()) {
      setIdError(true);
      setErrorMessage("* 아이디를 입력해 주세요.");
      return;
    }
    if (!password.trim()) {
      setPwError(true);
      setErrorMessage("* 비밀번호를 입력해 주세요.");
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");

      // API 호출 (credentials 객체 전달)
      const response = await login({
        loginId: id,
        password: password,
      });

      console.log("로그인 성공:", response);
      activateStomp();

      // 로그인 성공 시 /home 이동
      navigate("/home");
    } catch (error) {
      // 서버 에러 처리 (API 모듈에서 throw한 error catching)
      setPwError(true);

      if (error.response && error.response.data) {
        // 백엔드에서 전달한 에러 메시지 출력
        setErrorMessage(
          `* ${error.response.data.message || "로그인 정보가 올바르지 않습니다."}`,
        );
      } else {
        setErrorMessage("* 서버와의 통신 중 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Container>
      <S.ContentWrapper>
        {/* ================= STEP -1: 로그인 ================= */}
        {step === -1 && (
          <S.StepWrapper>
            <S.LoginHeaderSection>
              <S.LogoText>Dodoong</S.LogoText>
            </S.LoginHeaderSection>

            <S.LoginFormSection as="form" onSubmit={handleLogin}>
              <Input
                placeholder="아이디를 입력해 주세요"
                value={id}
                onChange={handleIdChange}
                isError={idError}
              />
              <Input
                type="password"
                placeholder="비밀번호를 입력해 주세요"
                value={password}
                onChange={handlePasswordChange}
                $marginTop="0.5rem"
                isError={pwError}
              />
              {/* 동적 에러 메시지 출력 */}
              <S.ErrorMessage>{errorMessage}</S.ErrorMessage>

              <CtaButton
                onClick={handleLogin}
                disabled={loading}
                $marginTop="1.5rem"
              >
                {loading ? "로그인 중..." : "로그인"}
              </CtaButton>
            </S.LoginFormSection>
          </S.StepWrapper>
        )}

        {/* ================= STEP 0: 메인 진입 화면 ================= */}
        {step === 0 && (
          <S.StepZeroWrapper>
            <S.LogoSection>
              <S.LogoText>Dodoong</S.LogoText>
            </S.LogoSection>
            <S.ButtonSection>
              <CtaButton onClick={() => setStep(-1)}>회원 로그인</CtaButton>
              <CtaButton
                $variant="secondary"
                onClick={() => navigate("/onboarding")}
              >
                회원가입
              </CtaButton>
            </S.ButtonSection>
          </S.StepZeroWrapper>
        )}
      </S.ContentWrapper>
    </S.Container>
  );
}
