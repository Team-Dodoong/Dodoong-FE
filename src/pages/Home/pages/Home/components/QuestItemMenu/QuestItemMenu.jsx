import * as S from './QuestItemMenu.style';
import { deleteDailyQuest, deleteRoutine } from '../../../../../../api/dailyQuestApi'; // API 불러오기

// 퀘스트 항목의 케밥(⋮) 메뉴.
// - daily: 수정하기 / 내일로 미루기 / 삭제하기
//   -> 삭제하기를 누르면 일일 삭제하기 / 영구 삭제하기 옵션으로 확장됩니다.
// - party: 파티탈퇴 단일 옵션
function QuestItemMenu({
  type,
  item,
  deleteExpanded,
  onEdit,
  onPostpone,
  onRequestDeleteOptions,
  onSuccess,
  // onDeleteToday,
  // onDeleteForever,
  onLeaveParty,
}) {
  if (type === 'party') {
    return (
      <S.Dropdown onClick={(e) => e.stopPropagation()} >
        <S.MenuItem type="button" $danger onClick={onLeaveParty}>
          파티탈퇴
        </S.MenuItem>
      </S.Dropdown>
    );
  }

  // 🟢 1. 수정하기 클릭 핸들러 (ID 전달 및 이벤트 전파 방지)
  const handleEditClick = (e) => {
    e.stopPropagation();
    const targetId = item?.dailyQuestId || item?.id;
    if (onEdit) onEdit(targetId);
  };

  // 🟢 2. 내일로 미루기 클릭 핸들러
  const handlePostponeClick = (e) => {
    e.stopPropagation();
    const targetId = item?.dailyQuestId || item?.id;
    if (onPostpone) onPostpone(targetId);
  };

  // 🟢 1. 일일 삭제하기 핸들러 (단건 삭제 API 연동)
  const handleDeleteToday = async (e) => {
    e.stopPropagation();

    // 💡 안전장치: 루틴 퀘스트인 경우 안내
    if (item?.isRoutine) {
      alert("반복 루틴 퀘스트는 '영구 삭제하기'를 이용해 주세요.");
      return;
    }

    if (!window.confirm("오늘의 퀘스트를 삭제하시겠습니까?")) return;

    try {
      const targetId = item?.dailyQuestId || item?.id;
      if (!targetId) throw new Error("퀘스트 ID를 찾을 수 없습니다.");
      
      await deleteDailyQuest(targetId);
      alert("퀘스트가 삭제되었습니다.");
      if (onSuccess) onSuccess(); // 목록 리프레시
    } catch (error) {
      console.error("일일 삭제 실패:", error);
      alert(error.response?.data?.message || "일일 퀘스트 삭제에 실패했습니다.");
    }
  };

  // 🟢 2. 영구 삭제하기 핸들러 (루틴 삭제 API 연동)
  const handleDeleteForever = async (e) => {
    e.stopPropagation();
    const routineId = item?.routineId;

    if (!routineId) {
      alert("삭제할 루틴 정보가 존재하지 않습니다.");
      return;
    }

    if (!window.confirm("이 루틴을 영구 삭제하시겠습니까? (이후 반복 일정 전체 삭제)")) return;

    try {
      await deleteRoutine(routineId);
      alert("루틴이 영구 삭제되었습니다.");
      if (onSuccess) onSuccess(); // 목록 리프레시
    } catch (error) {
      console.error("루틴 삭제 실패:", error);
      alert(error.response?.data?.message || "루틴 삭제에 실패했습니다.");
    }
  };

  return (
    <S.Dropdown onClick={(e) => e.stopPropagation()}>
      <S.MenuItem type="button" onClick={handleEditClick}>
        수정하기
      </S.MenuItem>
      <S.MenuItem type="button" onClick={handlePostponeClick}>
        내일로 미루기
      </S.MenuItem>

      {deleteExpanded ? (
        <>
          <S.MenuItem type="button" $danger onClick={handleDeleteToday}>
            일일 삭제하기
          </S.MenuItem>
          <S.MenuItem type="button" $danger onClick={handleDeleteForever}>
            영구 삭제하기
          </S.MenuItem>
        </>
      ) : (
        <S.MenuItem 
          type="button" 
          onClick={(e) => {
            e.stopPropagation();
            if (onRequestDeleteOptions) onRequestDeleteOptions();
          }}
        >
          삭제하기
        </S.MenuItem>
      )}
    </S.Dropdown>
  );
}


export default QuestItemMenu;
