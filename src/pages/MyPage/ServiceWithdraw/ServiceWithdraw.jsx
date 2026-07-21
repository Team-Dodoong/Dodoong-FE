import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import * as S from './ServiceWithdraw.style';

const ServiceWithdraw = () => {
  const navigate = useNavigate();
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);

  const handleBack = () => {
    navigate(-1); // 이전 페이지(마이페이지)로 이동
  };

  return (
    <S.Container>
      <S.Header>
        <S.BackButton onClick={handleBack} >←</S.BackButton>
        <S.HeaderTitle>서비스 탈퇴</S.HeaderTitle>
      </S.Header>

      <S.Content>
        <S.MainTitle>두둥 탈퇴 전<br />아래 주의사항을 꼭 확인해 주세요.</S.MainTitle>
        
        <S.NoticeList>
          <S.NoticeItem>탈퇴 시 두둥 서비스 이용이 불가합니다.</S.NoticeItem>
          <S.NoticeItem>탈퇴 시 회원님의 구매이력 확인과 유료 콘텐츠에 대한 이용 권한이 상실되고, 재가입 시에도 복구가 불가능합니다.</S.NoticeItem>
          <S.NoticeItem>탈퇴 시 회원님이 보유하셨던 포인트는 소멸되며, 소멸된 포인트는 복원 및 환불되지 않습니다.</S.NoticeItem>
        </S.NoticeList>

        <S.PointHighlight>유료 700 포인트를 보유 중입니다.</S.PointHighlight>
        <S.PointLink>포인트 내역 <span>→</span></S.PointLink>
      </S.Content>

      <S.CheckboxSection>
        <S.CheckboxRow onClick={() => setChecked1(!checked1)}>
          <S.CheckCircle active={checked1}>{checked1 && '✓'}</S.CheckCircle>
          <S.CheckboxLabel>탈퇴 시 회원님이 보유한 포인트는 모두 소멸되고, 복원 및 환불 불가한 것을 확인했습니다.</S.CheckboxLabel>
        </S.CheckboxRow>

        <S.CheckboxRow onClick={() => setChecked2(!checked2)}>
          <S.CheckCircle active={checked2} color="#ff7a00">{checked2 && '✓'}</S.CheckCircle>
          <S.CheckboxLabel>안내 사항을 모두 확인했으며, 탈퇴 시 회원 정보는 모두 삭제되고 데이터 복구가 불가함에 동의합니다.</S.CheckboxLabel>
        </S.CheckboxRow>
      </S.CheckboxSection>

      <S.SubmitButton disabled={!(checked1 && checked2)}>탈퇴하기</S.SubmitButton>
    </S.Container>
  );
};

export default ServiceWithdraw;