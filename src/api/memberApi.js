import api from './instance'

/**
 * ✅ 회원가입 API
 * @param {Object} userData - { loginId: string, password: string }
 * @returns {Promise<Object>} - { memberId: number, loginId: string }
 */
export const signup = async (userData) => {
  try {
    // POST /api/members/signup 요청
    const response = await api.post("/api/auth/signup", userData);
    return response.data;
  } catch (error) {
    // 서버에서 에러 응답(400 Bad Request 등)이 온 경우
    if (error.response) {
      console.error("회원가입 실패:", error.response.data.message);
    } else {
      console.error("회원가입 요청 중 오류 발생:", error.message);
    }
    throw error;
  }
};


/**
 * ✅ 로그인 API
 * @param {Object} credentials - { loginId: string, password: string }
 * @returns {Promise<Object>} - { status, code, message, data: { id, loginId } }
 */
export const login = async (credentials) => {
  try {
    // POST /api/auth/login 요청
    const response = await api.post("/api/auth/login", credentials);
    return response.data;
  } catch (error) {
    // 서버 오류 또는 인증 실패 시 (400 Bad Request 등)
    if (error.response) {
      console.error("로그인 실패:", error.response.data.message || "로그인 정보가 올바르지 않습니다.");
    } else {
      console.error("로그인 요청 중 오류 발생:", error.message);
    }
    throw error;
  }
};

/**
 * ✅ 로그아웃 API
 * 쿠키에 담긴 accessToken을 전달하여 로그아웃 처리합니다.
 * @returns {Promise<boolean>} 성공 여부 (true)
 */
export const logout = async () => {
  try {
    // POST /api/auth/logout 요청 (Body 없음)
    await api.post("/api/auth/logout");
    return true; // 204 No Content 성공 시 true 반환
  } catch (error) {
    // 400 Bad Request 등 실패 시
    if (error.response) {
      console.error(
        "로그아웃 실패:",
        error.response.data.message || "로그아웃 요청 처리 중 오류가 발생했습니다."
      );
    } else {
      console.error("로그아웃 요청 중 오류 발생:", error.message);
    }
    throw error;
  }
};

/**
 * ✅ 토큰 재발급(Reissue) API
 * 쿠키에 담긴 refreshToken을 이용하여 새로운 AccessToken을 재발급받습니다.
 * @returns {Promise<boolean>} 성공 여부 (true)
 */
export const reissueToken = async () => {
  try {
    // POST /api/auth/reissue 요청 (Body는 비어있음)
    await api.post("/api/auth/reissue");
    return true; // 204 No Content 성공 시 true 반환
  } catch (error) {
    // 401 Unauthorized 등 실패 시
    if (error.response) {
      console.error(
        "토큰 재발급 실패:",
        error.response.data.message || "리프레시 토큰이 만료되었거나 존재하지 않습니다."
      );
    } else {
      console.error("토큰 재발급 요청 중 오류 발생:", error.message);
    }
    throw error;
  }
};


/**
 * ✅ 내 회원 정보 조회 API
 * 쿠키에 담긴 accessToken을 이용하여 현재 로그인된 회원의 정보를 조회합니다.
 * @returns {Promise<Object>} - { memberId, loginId, nickname, profileImageUrl, introduction, level, experience, coin }
 */
export const getMyInfo = async () => {
  try {
    // GET /api/members/me 요청
    const response = await api.get("/api/members/me");
    return response.data;
  } catch (error) {
    // 400 Bad Request 또는 인증 실패 시
    if (error.response) {
      console.error(
        "회원 정보 조회 실패:",
        error.response.data.message || "회원 정보를 불러올 수 없습니다."
      );
    } else {
      console.error("회원 정보 조회 요청 중 오류 발생:", error.message);
    }
    throw error;
  }
};

/**
 * ✅ 프로필 설정 API
 * @param {Object} profileData - { nickname: string, introduction: string }
 * @param {File | null} imageFile - 업로드할 이미지 파일 객체 (선택)
 * @returns {Promise<Object>} - { nickname, profileImageUrl, introduction }
 */
export const updateProfile = async (profileData, imageFile = null) => {
  try {
    const formData = new FormData();

    // 1. request (JSON) 데이터 추가
    // 백엔드에서 JSON 파싱을 위해 Blob 객체로 타입을 지정해서 넣어줍니다.
    const jsonBlob = new Blob([JSON.stringify(profileData)], {
      type: "application/json",
    });
    formData.append("request", jsonBlob);

    // 2. profileImage (File) 데이터 추가 (파일이 존재할 경우만)
    if (imageFile) {
      formData.append("profileImage", imageFile);
    }

    // 3. multipart/form-data 요청 전송
    // 보통 프로필 수정은 PUT 또는 PATCH를 사용합니다.
    const response = await api.patch("/api/members/me", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "프로필 수정 실패:",
        error.response.data.message || "프로필 수정 중 오류가 발생했습니다."
      );
    } else {
      console.error("프로필 수정 요청 중 오류 발생:", error.message);
    }
    throw error;
  }
};


/**
 * ✅ 회원 탈퇴 API
 * 쿠키에 담긴 accessToken을 이용하여 현재 로그인된 회원 계정을 삭제합니다.
 * @returns {Promise<boolean>} 성공 여부 (true)
 */
export const deleteAccount = async () => {
  try {
    // DELETE /api/members/me 요청
    await api.delete("/api/members/me");
    return true; // 204 No Content 성공 시 true 반환
  } catch (error) {
    // 400 Bad Request 또는 인증 실패 시
    if (error.response) {
      console.error(
        "회원 탈퇴 실패:",
        error.response.data.message || "회원 탈퇴 처리 중 오류가 발생했습니다."
      );
    } else {
      console.error("회원 탈퇴 요청 중 오류 발생:", error.message);
    }
    throw error;
  }
};

/**
 * ✅ 레벨업 API
 * 쿠키에 담긴 accessToken을 이용하여 캐릭터/회원의 레벨업을 진행합니다.
 * @returns {Promise<Object>} - { level: number, coin: number, experience: number }
 */
export const levelUp = async () => {
  try {
    // POST /api/members/levelup 요청 (Body는 비어있음)
    const response = await api.patch("/api/members/levelup");
    return response.data;
  } catch (error) {
    // 400 Bad Request 또는 인증 실패 시
    if (error.response) {
      console.error(
        "레벨업 실패:",
        error.response.data.message || "레벨업 조건이 충족되지 않았거나 오류가 발생했습니다."
      );
    } else {
      console.error("레벨업 요청 중 오류 발생:", error.message);
    }
    throw error;
  }
};