import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "../PartyCreate/PartyCreate.style";
import Input from "../../../components/Input/Input";

import { createParty } from "../../../api/partyApi";

const CATEGORIES = ["공부", "운동", "일상", "외국어", "취업"];
const CATEGORY_MAP = {
  공부: "STUDY",
  취업: "CAREER",
  일상: "DAILY",
  외국어: "LANGUAGE",
  운동: "FITNESS",
};

function PartyCreate() {
  const navigate = useNavigate();
  const [partyName, setPartyName] = useState("");
  const [description, setDescription] = useState("");
  const [questContent, setQuestContent] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [maxMembers, setMaxMembers] = useState(1);
  const [isPublic, setIsPublic] = useState(true);
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [showImageMenu, setShowImageMenu] = useState(false);
  const galleryInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleCategory = (cat) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    } else {
      if (selectedCategories.length < 4) {
        setSelectedCategories([...selectedCategories, cat]);
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleComplete = async () => {
    try {
      const requestBody = {
        name: partyName,
        description: description,
        categories: selectedCategories.map((cat) => CATEGORY_MAP[cat]),
        maxMembers: Number(maxMembers),
        isPublic: isPublic,
        partyPassword: !isPublic ? password : undefined,
        questContent: questContent,
        imageUrl: image || "https://test-image.com/temp.png",
      };

      const response = await createParty(requestBody);
      console.log("파티 생성 성공", response.data);
      navigate("/party");
    } catch (error) {
      console.error("파티 생성 실패", error);
    }
  };

  return (
    <div>
      <S.HeaderWrapper>
        <S.BackIcon onClick={() => navigate(-1)} />
        <S.HeaderTitle>파티 개설</S.HeaderTitle>
        <S.CompleteButton onClick={handleComplete}>완료</S.CompleteButton>
      </S.HeaderWrapper>
      <S.ScrollArea>
        <S.BodyWrapper>
          <div>
            <S.BodyTitle>파티명</S.BodyTitle>
            <Input
              placeholder="띄어쓰기 포함 10자 이내로 입력해주세요."
              maxLength={10}
              value={partyName}
              onChange={(e) => setPartyName(e.target.value)}
            />
          </div>
          <div>
            <S.BodyTitleWrapper>
              <S.BodyTitle>카테고리</S.BodyTitle>
              <S.BodySubTitle>
                *최대 4개의 카테고리를 선택할 수 있습니다.
              </S.BodySubTitle>
            </S.BodyTitleWrapper>
            <S.CategoryRow>
              {CATEGORIES.map((cat, i) => (
                <S.CategoryTag
                  key={i}
                  $active={selectedCategories.includes(cat)}
                  onClick={() => handleCategory(cat)}
                >
                  {cat}
                </S.CategoryTag>
              ))}
            </S.CategoryRow>
          </div>
          <div>
            <S.BodyTitle>파티퀘스트</S.BodyTitle>
            <Input
              placeholder="파티퀘스트를 입력해주세요."
              value={questContent}
              onChange={(e) => setQuestContent(e.target.value)}
            />
          </div>
          <div>
            <S.BodyTitle>파티소개</S.BodyTitle>
            <Input
              placeholder="파티소개글을 입력해주세요."
              as="textarea"
              $height="10rem"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <S.BodyTitle>파티세부설정</S.BodyTitle>
            <S.Spacer />
            <S.SettingRow>
              <S.SettingWrapper>
                <S.SettingLabel>최대 인원</S.SettingLabel>
                <S.SettingInput
                  type="number"
                  value={maxMembers}
                  onChange={(e) => setMaxMembers(e.target.value)}
                  min={1}
                />
              </S.SettingWrapper>
            </S.SettingRow>
            <S.Spacer />
            <S.Spacer />
            <S.SettingRow>
              <S.SettingWrapper>
                <S.SettingLabel>파티 공개</S.SettingLabel>
                {isPublic ? (
                  <S.ToggleOnIcon onClick={() => setIsPublic(false)} />
                ) : (
                  <S.ToggleOffIcon onClick={() => setIsPublic(true)} />
                )}
              </S.SettingWrapper>
              <S.SettingWrapper>
                <S.SettingLabel>비밀번호</S.SettingLabel>
                <S.SettingInput
                  type="number"
                  value={password}
                  onChange={(e) => {
                    if (e.target.value.length <= 4) setPassword(e.target.value);
                  }}
                  inputMode="numeric"
                  maxLength={4}
                />
              </S.SettingWrapper>
            </S.SettingRow>
          </div>
          <div>
            <S.BodyTitleWrapper>
              <S.BodyTitle>이미지설정</S.BodyTitle>
              <S.BodySubTitle>
                *이미지는 최대 1장만 설정이 가능합니다.
              </S.BodySubTitle>
            </S.BodyTitleWrapper>
            <S.Spacer />
            <S.ImageRow>
              <S.AddImageBox
                onClick={() => setShowImageMenu(true)}
                $disabled={!!image}
              >
                <S.CameraIcon />
                <span>사진 추가</span>
              </S.AddImageBox>
              {image && <S.PreviewImage src={image} alt="preview" />}
            </S.ImageRow>
          </div>
        </S.BodyWrapper>
      </S.ScrollArea>

      <input
        type="file"
        accept="image/*"
        ref={galleryInputRef}
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={cameraInputRef}
        style={{ display: "none" }}
        onChange={handleImageChange}
      />

      {showImageMenu && (
        <>
          <S.Overlay onClick={() => setShowImageMenu(false)} />
          <S.BottomSheet>
            <S.MenuHandle />
            <S.MenuItem
              onClick={() => {
                galleryInputRef.current.click();
                setShowImageMenu(false);
              }}
            >
              <S.PhotoIcon /> 사진
            </S.MenuItem>
            <S.MenuItem
              onClick={() => {
                cameraInputRef.current.click();
                setShowImageMenu(false);
              }}
            >
              <S.SheetCameraIcon /> 사진
            </S.MenuItem>
            <S.MenuItem
              $delete
              onClick={() => {
                setImage(null);
                setShowImageMenu(false);
              }}
            >
              <S.CancelIcon /> 이미지 삭제
            </S.MenuItem>
          </S.BottomSheet>
        </>
      )}
    </div>
  );
}

export default PartyCreate;
