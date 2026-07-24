import Back from "../../../assets/ic_back_24.svg?react";
import Eye from "../../../assets/ic_eye_24.svg?react";
import EyeOff from "../../../assets/ic_eye-off_24.svg?react";
import Camera from "../../../assets/ic_linear_camera_24.svg?react";
import ToggleOn from "../../../assets/ic_toggle_on.svg?react";
import ToggleOff from "../../../assets/ic_toggle_off.svg?react";
import Photo from "../../../assets/ic_photo_24.svg?react";
import Cancel from "../../../assets/ic_linear_cancel_24.svg?react";
import styled from "styled-components";
import {
  SemiBold_16,
  Regular_12,
  Medium_12,
  Regular_14,
  R_16,
  Medium_14,
} from "../../../styles/Fonts";

export const HeaderWrapper = styled.div`
  padding: 0.75rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--Gray_1);
`;

export const BackIcon = styled(Back)`
  height: 1.5rem;
  width: 1.5rem;
  color: var(--Black);
`;

export const HeaderTitle = styled.h3`
  ${SemiBold_16};
  color: var(--Black);
`;

export const CompleteButton = styled.button`
  ${SemiBold_16};
  color: var(--Main);
`;

export const ScrollArea = styled.div`
  height: calc(100vh - 8.4375rem);
  overflow-y: auto;
  overflow-x: hidden;
`;

export const BodyWrapper = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
`;

export const BodyTitle = styled.h4`
  ${SemiBold_16};
  color: #646464;
  padding-bottom: 0.5rem;
`;

export const BodySubTitle = styled.p`
  ${Regular_12};
  color: var(--Gray_4);
`;
export const BodyTitleWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const CategoryRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.25rem;
`;

export const CategoryTag = styled.button`
  padding: 0.5rem 0.75rem;
  border-radius: 3.125rem;
  border: none;
  background: ${({ $active }) => ($active ? "var(--Main)" : "var(--Gray_1)")};
  color: ${({ $active }) => ($active ? "var(--White)" : "var(--Gray_6)")};
  ${Medium_12};
  cursor: pointer;
  transition: all 0.15s;
`;

export const Spacer = styled.div`
  height: 0.25rem;
`;

export const SettingRow = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--Gray_2);
  gap: 3.5rem;
`;

export const SettingWrapper = styled.div`
  display: flex;
  flex: 1;
  gap: 1.25rem;
`;
export const SettingLabel = styled.p`
  ${Regular_14};
  color: var(--Gray_5);
  white-space: nowrap;
`;

export const SettingInput = styled.input`
  border: none;
  outline: none;
  ${R_16};
  color: var(--Gray_6);
  letter-spacing: -4%;
`;

export const ToggleOnIcon = styled(ToggleOn)`
  cursor: pointer;
`;

export const ToggleOffIcon = styled(ToggleOff)`
  cursor: pointer;
`;

export const CameraIcon = styled(Camera)`
  width: 1.5rem;
  height: 1.5rem;
  color: var(--Gray_6);
`;

export const ImageRow = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const AddImageBox = styled.div`
  ${Regular_14};
  width: 5.75rem;
  height: 5.75rem;
  border-radius: 0.25rem;
  background: var(--Gray_1);
  border: 1px solid var(--Gray_2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: ${({ $disabled }) => ($disabled ? "default" : "pointer")};
  color: var(--Gray_6);
`;

export const PreviewImage = styled.img`
  width: 5.75rem;
  height: 5.75rem;
  border-radius: 0.25rem;
  border: 1px solid var(--Gray_2);
  object-fit: cover;
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 100;
`;

export const BottomSheet = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 480px;
  background: white;
  border-radius: 16px 16px 0 0;
  padding: 1rem 1.25rem 5rem;
  z-index: 101;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const MenuHandle = styled.div`
  width: 2.5rem;
  height: 4px;
  background: var(--Gray_2);
  border-radius: 999px;
  margin: 0 auto 1rem;
`;

export const MenuItem = styled.div`
  ${Medium_14};
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 0.75rem;
  color: ${({ $delete }) => ($delete ? "var(--Red)" : "#a1a1a1")};
  cursor: pointer;
`;

export const SheetCameraIcon = styled(Camera)`
  width: 1.5rem;
  height: 1.5rem;
  color: #a1a1a1;
`;

export const PhotoIcon = styled(Photo)`
  width: 1.5rem;
  height: 1.5rem;
  color: #a1a1a1;
`;

export const CancelIcon = styled(Cancel)`
  width: 1.5rem;
  height: 1.5rem;
  color: var(--Red);
`;
