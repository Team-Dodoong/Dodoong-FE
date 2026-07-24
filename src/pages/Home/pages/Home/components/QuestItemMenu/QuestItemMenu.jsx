import * as S from './QuestItemMenu.style';

// 퀘스트 항목의 케밥(⋮) 메뉴.
// - daily: 수정하기 / 내일로 미루기 / 삭제하기
//   -> 삭제하기를 누르면 일일 삭제하기 / 영구 삭제하기 옵션으로 확장됩니다.
// - party: 파티탈퇴 단일 옵션
function QuestItemMenu({
  type,
  deleteExpanded,
  onEdit,
  onPostpone,
  onRequestDeleteOptions,
  onDeleteToday,
  onDeleteForever,
  onLeaveParty,
}) {
  if (type === 'party') {
    return (
      <S.Dropdown>
        <S.MenuItem type="button" $danger onClick={onLeaveParty}>
          파티탈퇴
        </S.MenuItem>
      </S.Dropdown>
    );
  }

  return (
    <S.Dropdown>
      <S.MenuItem type="button" onClick={onEdit}>
        수정하기
      </S.MenuItem>
      <S.MenuItem type="button" onClick={onPostpone}>
        내일로 미루기
      </S.MenuItem>

      {deleteExpanded ? (
        <>
          <S.MenuItem type="button" $danger onClick={onDeleteToday}>
            일일 삭제하기
          </S.MenuItem>
          <S.MenuItem type="button" $danger onClick={onDeleteForever}>
            영구 삭제하기
          </S.MenuItem>
        </>
      ) : (
        <S.MenuItem type="button" onClick={onRequestDeleteOptions}>
          삭제하기
        </S.MenuItem>
      )}
    </S.Dropdown>
  );
}


export default QuestItemMenu;
