import React, { useState } from 'react';
import * as S from './Input.style';

// 외부에서 주는 속성들(props)을 받을 수 있도록 구조 분해 할당
// 기본값으로 type="text"를 설정
const Input = ({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  isError,
  $marginTop, 
  $height,
  as,      //'textarea' 같은 다른 태그로 변환해 줄 as 속성을 받음
  ...props 
}) => {
  // 비밀번호 보이기/숨기기 상태 관리
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    // 에러 상태(isError)에 따라 스타일 파일에서 테두리 색을 바꿀 수 있게 props를 넘겨줌.
    <S.InputContainer $isError={isError} $marginTop={$marginTop} $height={$height}>
      <S.StyledInput
        as={as}
        type={inputType}
        placeholder={placeholder} // 고정 텍스트 대신 외부에서 준 placeholder를 연결
        value={value}
        onChange={onChange}
        {...props} // rows={4}나 임의의 style 같은 나머지 속성들을 안전하게 input 태그에 전달
      />

      {/* 입력 타입이 'password'일 때만 눈 모양 토글 버튼을 띄워줌 */}
      {type === 'password' && (
        <S.ToggleButton type="button" onClick={handleTogglePassword}>
          {showPassword ? (
            <S.EyeIcon />
          ) : (
            <S.EyeOffIcon />
          )}
        </S.ToggleButton>
      )}
    </S.InputContainer>
  );
};

// 파일 이름에 맞게 기본 내보내기 이름을 Input으로 변경
export default Input;