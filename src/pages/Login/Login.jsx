import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './login.style';
import Input from "../../components/Input/Input";
import CtaButton from "../../components/Button/CtaButton";

export default function Login() {
  const [step, setStep] = useState(0); // // -1: 로그인, 0: 메인
  const navigate = useNavigate(); // navigate 함수 생성

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  
  // Validation States (이미지에 있던 에러 메시지 구현용)
  const [idError, setIdError] = useState(false); // true일 때 *중복된 아이디입니다
  const [pwError, setPwError] = useState(false); // true일 때 *비밀번호가 일치하지 않습니다

  // 로그인 처리 함수 
  const handleLogin = () => {
    console.log('로그인 시도:', id);
    // TODO: 추후 여기에 로그인 API 요청 로직 추가
    
    // router.jsx에 정의된 '/home' (Home 페이지) 경로로 이동
    navigate('/home'); 
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

            <S.LoginFormSection>
              <Input 
                placeholder="아이디를 입력해 주세요" 
                value={id} 
                onChange={(e) => setId(e.target.value)}
                isError={idError} 
              />
              <Input 
                type="password" 
                placeholder="비밀번호를 입력해 주세요" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                $marginTop="0.5rem"
                isError={pwError}
              />
              {pwError && <S.ErrorMessage>*비밀번호가 일치하지 않습니다</S.ErrorMessage>}
            </S.LoginFormSection>
            <CtaButton  onClick={handleLogin}>로그인</CtaButton>
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
              <CtaButton $variant="secondary" onClick={() => navigate("/onboarding")}>회원가입</CtaButton>
            </S.ButtonSection>
          </S.StepZeroWrapper>
        )}
        
      </S.ContentWrapper>
    </S.Container>
  );
}