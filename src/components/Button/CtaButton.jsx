import React from 'react';
// 스타일 파일에서 정의한 컴포넌트들을 S 객체로 가져옵니다.
import * as S from './CtaButton.style';

function CtaButton({ text = "동의 후 계속하기", variant = "todo", onClick }) {
  return (
    <S.Container $variant={variant}>
      <S.BlackButton onClick={onClick}>
        {text}
      </S.BlackButton>
    </S.Container>
  );
}

export default CtaButton;