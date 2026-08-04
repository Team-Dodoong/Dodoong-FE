import api from "./instance";


/**
 * ✅ 일일퀘스트 등록 API
 * 
 * @param {Object} questData 퀘스트 등록 데이터
 * @param {string} questData.questCategory - 카테고리 ('IMPORTANT_URGENT' | 'IMPORTANT_NOT_URGENT' | 'NOT_IMPORTANT_URGENT' | 'NOT_IMPORTANT_NOT_URGENT')
 * @param {string} questData.content - 퀘스트 내용
 * @param {boolean} questData.isRoutine - 반복 퀘스트 여부 (일회성: false, 반복: true)
 * @param {Array<string>|null} [questData.repeatDays] - 반복 요일 배열 (예: ['MONDAY', 'FRIDAY']) (일회성일 경우 null)
 * @param {string|null} [questData.endDate] - 반복 종료일 (예: '2026-07-30') (일회성일 경우 null)
 * 
 * @returns {Promise<Object>} 생성된 퀘스트 응답 데이터 ({ status, code, message, data: { ... } })
 */
export const createDailyQuest = async (questData) => {
  try {
    // POST /api/daily-quests 요청
    const response = await api.post("/api/daily-quests", questData);
    return response.data;
  } catch (error) {
    // 서버에서 에러 응답(400 Bad Request 등)이 온 경우
    if (error.response) {
      console.error(
        "일일퀘스트 등록 실패:",
        error.response.data.message || "요청 본문이 올바르지 않습니다."
      );
    } else {
      console.error("일일퀘스트 등록 요청 중 오류 발생:", error.message);
    }
    throw error;
  }
};

/**
 * ✅ 캘린더 전체 조회 API
 * 일일퀘스트를 캘린더 형태(날짜별 총 퀘스트 수 및 완료 퀘스트 수)로 조회합니다.
 * 
 * @param {number} year - 조회 연도 (예: 2026)
 * @param {number} month - 조회 월 (예: 7)
 * 
 * @returns {Promise<Object>} - { status, code, message, data: { year, month, days: [{ date, totalCount, checkedCount }] } }
 */
export const getCalendarQuests = async (year, month) => {
  try {
    // GET /api/daily-quests/calendar?year=2026&month=7 요청
    const response = await api.get("/api/daily-quests/calendar", {
      params: { year, month },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "캘린더 조회 실패:",
        error.response.data.message || "캘린더 정보를 불러오는 중 오류가 발생했습니다."
      );
    } else {
      console.error("캘린더 조회 요청 중 오류 발생:", error.message);
    }
    throw error;
  }
};

/**
 * ✅ 캘린더 상세(특정 날짜 퀘스트 목록) 조회 API
 * 특정 날짜(yyyy-MM-dd)의 일일퀘스트 목록을 조회합니다.
 * 
 * @param {string} date - 조회할 날짜 (형식: 'YYYY-MM-DD', 예: '2026-07-14')
 * 
 * @returns {Promise<Object>} - { status, code, message, data: { date, quests: [{ dailyQuestId, questCategory, content, isChecked, isRoutine, routineId }] } }
 */
export const getDailyQuestsByDate = async (date) => {
  try {
    // GET /api/daily-quests?date=2026-07-14 요청
    const response = await api.get("/api/daily-quests", {
      params: { date },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "일일퀘스트 상세 조회 실패:",
        error.response.data.message || "해당 날짜의 퀘스트 목록을 불러올 수 없습니다."
      );
    } else {
      console.error("일일퀘스트 상세 조회 요청 중 오류 발생:", error.message);
    }
    throw error;
  }
};

/**
 * ✅ 사분면 전체 조회 API
 * 일일퀘스트를 사분면 카테고리별(IMPORTANT_URGENT, IMPORTANT_NOT_URGENT 등)로 그룹화하여 조회합니다.
 * 
 * @returns {Promise<Object>} - { status, code, message, data: { quadrants: [{ category, quests: [...] }] } }
 */
export const getQuadrantQuests = async () => {
  try {
    // GET /api/daily-quests/quadrants 요청
    const response = await api.get("/api/daily-quests/quadrants");
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "사분면 조회 실패:",
        error.response.data.message || "사분면 퀘스트 목록을 불러오는 중 오류가 발생했습니다."
      );
    } else {
      console.error("사분면 조회 요청 중 오류 발생:", error.message);
    }
    throw error;
  }
};

/**
 * ✅ 사분면 상세 조회 API
 * 특정 사분면 카테고리(questCategory)에 해당하는 퀘스트 목록을 조회합니다.
 * 
 * @param {string} questCategory - 사분면 카테고리 ('IMPORTANT_URGENT', 'IMPORTANT_NOT_URGENT', 'NOT_IMPORTANT_URGENT', 'NOT_IMPORTANT_NOT_URGENT')
 * 
 * @returns {Promise<Object>} - { status, code, message, data: { category, quests: [{ dailyQuestId, content, questDate, isRoutine, routineId }] } }
 */
export const getQuadrantQuestsByCategory = async (questCategory) => {
  try {
    // GET /api/daily-quests/quadrants/{questCategory} 요청
    const response = await api.get(`/api/daily-quests/quadrants/${questCategory}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "사분면 상세 조회 실패:",
        error.response.data.message || "해당 사분면의 퀘스트 목록을 불러오는 중 오류가 발생했습니다."
      );
    } else {
      console.error("사분면 상세 조회 요청 중 오류 발생:", error.message);
    }
    throw error;
  }
};

/**
 * ✅ 일일퀘스트 수정 API
 * 특정 일일퀘스트의 카테고리나 내용을 수정합니다.
 * 
 * @param {number|string} dailyQuestId - 수정할 퀘스트 ID (Path Variable)
 * @param {Object} updateData - 수정할 데이터 객체 (questCategory, content 중 선택 또는 모두 전달 가능)
 * @param {string} [updateData.questCategory] - 수정할 사분면 카테고리 (예: 'IMPORTANT_URGENT')
 * @param {string} [updateData.content] - 수정할 퀘스트 내용
 * 
 * @returns {Promise<Object>} - { status, code, message, data: { dailyQuestId, questCategory, content, isChecked, isRoutine, routineId } }
 */
export const updateDailyQuest = async (dailyQuestId, updateData) => {
  try {
    // PATCH /api/daily-quests/{dailyQuestId} 요청
    const response = await api.patch(`/api/daily-quests/${dailyQuestId}`, updateData);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "일일퀘스트 수정 실패:",
        error.response.data.message || "퀘스트 수정 중 오류가 발생했습니다."
      );
    } else {
      console.error("일일퀘스트 수정 요청 중 오류 발생:", error.message);
    }
    throw error;
  }
};

/**
 * ✅ 일일퀘스트 달성 / 달성 취소 API
 * 특정 일일퀘스트의 달성 여부(isChecked)를 변경합니다.
 * 
 * @param {number|string} dailyQuestId - 상태를 변경할 퀘스트 ID (Path Variable)
 * @param {boolean} isChecked - 달성 여부 (true: 달성, false: 달성 취소)
 * 
 * @returns {Promise<Object>} - { status, code, message, data: { quest: { dailyQuestId, questCategory, content, isChecked, isRoutine, routineId }, experience, experienceDelta } }
 */
export const toggleCheckDailyQuest = async (dailyQuestId, isChecked) => {
  try {
    // PATCH /api/daily-quests/{dailyQuestId}/check 요청
    const response = await api.patch(`/api/daily-quests/${dailyQuestId}/check`, {
      isChecked: isChecked,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "퀘스트 달성 상태 변경 실패:",
        error.response.data.message || "달성 상태 변경 중 오류가 발생했습니다."
      );
    } else {
      console.error("퀘스트 달성 상태 변경 요청 중 오류 발생:", error.message);
    }
    throw error;
  }
};

/**
 * ✅ 일일퀘스트 일정 미루기 API
 * 오늘의 일일퀘스트 일정을 다음 날로 미룹니다. (루틴은 미루기 불가)
 * 
 * @param {number|string} dailyQuestId - 미룰 퀘스트 ID (Path Variable)
 * 
 * @returns {Promise<Object>} - { status, code, message, data: { dailyQuestId, questCategory, content, questDate, isChecked } }
 */
export const postponeDailyQuest = async (dailyQuestId) => {
  try {
    // POST /api/daily-quests/{dailyQuestId}/postpone 요청
    const response = await api.post(`/api/daily-quests/${dailyQuestId}/postpone`);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "일정 미루기 실패:",
        error.response.data.message || "일정을 미루는 중 오류가 발생했습니다."
      );
    } else {
      console.error("일정 미루기 요청 중 오류 발생:", error.message);
    }
    throw error;
  }
};

/**
 * ✅ 일일퀘스트 삭제 API
 * 특정 일일퀘스트를 삭제합니다.
 * 
 * @param {number|string} dailyQuestId - 삭제할 퀘스트 ID (Path Variable)
 */
export const deleteDailyQuest = async (dailyQuestId) => {
  try {
    // DELETE /api/daily-quests/{dailyQuestId} 요청
    await api.delete(`/api/daily-quests/${dailyQuestId}`);
  } catch (error) {
    if (error.response) {
      console.error(
        "퀘스트 삭제 실패:",
        error.response.data.message || "퀘스트 삭제 중 오류가 발생했습니다."
      );
    } else {
      console.error("퀘스트 삭제 요청 중 오류 발생:", error.message);
    }
    throw error;
  }
};

/**
 * ✅ 루틴 삭제 API
 * 특정 루틴을 삭제합니다.
 * 
 * @param {number|string} routineId - 삭제할 루틴 ID (Path Variable)
 */
export const deleteRoutine = async (routineId) => {
  try {
    // DELETE /api/routines/{routineId} 요청
    await api.delete(`/api/routines/${routineId}`);
  } catch (error) {
    if (error.response) {
      console.error(
        "루틴 삭제 실패:",
        error.response.data.message || "루틴 삭제 중 오류가 발생했습니다."
      );
    } else {
      console.error("루틴 삭제 요청 중 오류 발생:", error.message);
    }
    throw error;
  }
};