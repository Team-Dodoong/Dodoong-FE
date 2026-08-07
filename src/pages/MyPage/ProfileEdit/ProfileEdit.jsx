import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./ProfileEdit.style";
import BackIcon from "../../../assets/ic_back_24.svg?react";
import MyPageProfileImage from "../../../assets/mypage-profile-image.png";
import {
  getMyInfo,
  getProfileUploadUrl,
  uploadProfileImageToS3,
  updateProfile,
} from "../../../api/memberApi";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [nickname, setNickname] = useState("");
  const [intro, setIntro] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);

  // 2. 초기 회원 데이터 불러오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await getMyInfo();
        const data = response.data || response;

        if (data) {
          setNickname(data.nickname || "");
          setIntro(data.introduction || "");
          setPreviewImage(data.profileImageUrl || null);
        }
      } catch (error) {
        console.error("초기 프로필 데이터 로딩 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // 3. 파일 선택 핸들러 (이미지 변경)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // 서버로 보낼 File 객체 저장
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl); // 화면 미리보기용 URL 생성
    }
  };

  // 4. 저장하기 버튼 클릭 핸들러 (updateProfile API 호출)
  const handleSubmit = async () => {
    if (!nickname.trim()) {
      alert("닉네임을 입력해 주세요.");
      return;
    }

    try {
      let profileImageKey = null;

      if (imageFile) {
        const contentType = imageFile.type;

        const { uploadUrl, profileImageKey: issuedProfileImageKey } =
          await getProfileUploadUrl(contentType);

        await uploadProfileImageToS3(uploadUrl, imageFile, contentType);

        profileImageKey = issuedProfileImageKey;
      }

      const profileData = {
        nickname,
        introduction: intro,
        profileImageKey,
      };

      await updateProfile(profileData);

      alert("프로필이 성공적으로 수정되었습니다.");
      navigate(-1);
    } catch (error) {
      console.error("프로필 수정 실패:", error);
      console.error("응답:", error.response?.data);
      console.error("상태코드:", error.response?.status);

      alert("프로필 수정에 실패했습니다.");
    }
  };

  if (loading) {
    return <S.Container>로딩 중...</S.Container>;
  }

  return (
    <S.Container>
      <S.Header>
        <S.HeaderTitle>프로필 수정</S.HeaderTitle>
        <S.CancelButton onClick={() => navigate(-1)}>취소</S.CancelButton>
      </S.Header>

      {/* 아바타 클릭 시 파일 업로드창 열기 */}
      <S.AvatarContainer onClick={() => fileInputRef.current?.click()}>
        <S.Avatar src={previewImage || MyPageProfileImage} alt="프로필" />
        <S.AddBadge>+</S.AddBadge>
        {/* 숨겨진 file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          style={{ display: "none" }}
        />
      </S.AvatarContainer>

      <S.FormGroup>
        <S.LabelRow>
          <S.Label>닉네임</S.Label>
          <S.Count>{nickname.length}/16</S.Count>
        </S.LabelRow>
        <S.InputWrapper>
          <S.Input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            maxLength={16}
          />
          {nickname && (
            <S.ClearButton onClick={() => setNickname("")}>×</S.ClearButton>
          )}
        </S.InputWrapper>
      </S.FormGroup>

      <S.FormGroup>
        <S.LabelRow>
          <S.Label>나의 소개글</S.Label>
        </S.LabelRow>
        <S.TextAreaWrapper>
          <S.TextArea
            placeholder="소개글을 입력해 주세요"
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
          />
        </S.TextAreaWrapper>
      </S.FormGroup>

      <S.SubmitButton onClick={handleSubmit}>저장하기</S.SubmitButton>
    </S.Container>
  );
};

export default ProfileEdit;
