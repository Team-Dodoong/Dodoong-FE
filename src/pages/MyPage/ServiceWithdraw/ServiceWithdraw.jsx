import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import * as S from './ServiceWithdraw.style';
import CtaButton from "../../../components/Button/CtaButton";
import Check from '../../../assets/ic_regular_check_24.svg?react';
import { getMyInfo, deleteAccount } from '../../../api/memberApi';

const ServiceWithdraw = () => {
  const navigate = useNavigate();
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  // 1. 보유 포인트 및 정보 상태
  const [point, setPoint] = useState(0);
  const [loading, setLoading] = useState(true);

  // 2. 마운트 시 내 정보 조회 (보유 포인트 확인용)
  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        setLoading(true);
        const response = await getMyInfo();
        const data = response.data || response;
        // 서버 응답 구조에 따라 coin 또는 point 사용
        setPoint(data?.coin ?? data?.point ?? 0);
      } catch (error) {
        console.error("회원 정보 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyInfo();
  }, []);

  const handleBack = () => {
    navigate(-1); // 이전 페이지(마이페이지)로 이동
  };

  // 3. 탈퇴 처리 함수
  const handleDeleteAccount = async () => {
    if (!checked1 || !checked2) return;

    // 사용자 실수 방지 final 컨펌창
    const isConfirmed = window.confirm("정말로 탈퇴하시겠습니까? 탈퇴 후에는 계정 복구가 불가능합니다.");
    if (!isConfirmed) return;

    try {
      await deleteAccount(); // 회원 탈퇴 API 호출
      alert("회원 탈퇴가 완료되었습니다. 그동안 이용해 주셔서 감사합니다.");
      
      // 토큰 및 인증 정보 정리
      localStorage.removeItem("token");
      
      // 메인/온보딩 화면으로 이동 (history 쌓이지 않게 replace 사용)
      navigate('/', { replace: true });
    } catch (error) {
      console.error("회원 탈퇴 실패:", error);
      alert("탈퇴 처리 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  if (loading) {
    return <S.Container>로딩 중...</S.Container>;
  }

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

        {/* 동적으로 가져온 포인트 표시 */}
        <S.PointHighlight>유료 {point} 포인트를 보유 중입니다.</S.PointHighlight>
        <S.PointLink onClick={() => navigate('/points')}>
          포인트 내역 <span>→</span>
        </S.PointLink>
      </S.Content>

      <S.CheckboxSection>
        <S.CheckboxRow onClick={() => setChecked1(!checked1)}>
          <S.CheckCircle active={checked1}>{checked1 && <S.CheckIcon />}</S.CheckCircle>
          <S.CheckboxLabel>탈퇴 시 회원님이 보유한 포인트는 모두 소멸되고, 복원 및 환불 불가한 것을 확인했습니다.</S.CheckboxLabel>
        </S.CheckboxRow>

        <S.CheckboxRow onClick={() => setChecked2(!checked2)}>
          <S.CheckCircle active={checked2}>{checked2 && <S.CheckIcon /> }</S.CheckCircle>
          <S.CheckboxLabel>안내 사항을 모두 확인했으며, 탈퇴 시 회원 정보는 모두 삭제되고 데이터 복구가 불가함에 동의합니다.</S.CheckboxLabel>
        </S.CheckboxRow>
      </S.CheckboxSection>

      <CtaButton 
        $variant="bottom" 
        disabled={!(checked1 && checked2)} 
        onClick={handleDeleteAccount}
        >
          탈퇴하기
        </CtaButton>
    </S.Container>
  );
};

export default ServiceWithdraw;