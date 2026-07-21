import React from 'react';
import * as S from './CtaButton.style';

function CtaButton({ children, text, variant, $variant, onClick, disabled }) {
  // 둘 중 하나라도 secondary나 bottom이면 그 값을 쓰고, 없으면 기본값 'todo'
  const finalVariant = $variant || variant || "todo";

  return (
    <S.Container $variant={finalVariant}>
      <S.BlackButton 
        $variant={finalVariant} 
        onClick={onClick}
        disabled={disabled}
        >
        {children || text || "동의 후 계속하기"}
      </S.BlackButton>
    </S.Container>
  );
}

export default CtaButton;