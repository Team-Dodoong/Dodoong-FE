import api from "./instance";

/**
 * 사용자 스트릭(연속 달성) 정보 조회
 * GET /api/streaks
 */
export const getStreaks = async () => {
  try {
    const response = await api.get('/api/streaks');
    return response.data;
  } catch (error) {
    console.error('스트릭 정보 조회 실패:', error);
    throw error;
  }
};