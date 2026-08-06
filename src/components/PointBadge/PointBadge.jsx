import * as S from './PointBadge.style';

// 보유 포인트 뱃지. 홈/상점/마이페이지 등에서 공통으로 사용합니다.
function PointBadge({ point }) {
  return (
    <S.Wrapper>
      <S.Coin />
      <S.Amount>
        <S.AmountNumber>{point.toLocaleString()}</S.AmountNumber> P
      </S.Amount>
    </S.Wrapper>
  );
}

export default PointBadge;
