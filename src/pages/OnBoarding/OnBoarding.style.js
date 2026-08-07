import styled from 'styled-components';
import backIcon from '../../assets/ic_back_24.svg';
import arrowIcon from '../../assets/ic_bold_chevron_right_24.svg';
import cameraIcon from '../../assets/ic_linear_camera_24.svg';
import Check from '../../assets/ic_bold_check_24.svg?react';


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100dvh; 
  background-color: var(--White, #ffffff);
  box-sizing: border-box;
  position: relative;
  overflow-y: hidden; /* 이중 높이로 인한 스크롤 방지 */
`;

export const NavBar = styled.div` // 상단 navbar
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  box-sizing: border-box;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BackIcon = styled.img.attrs({
  src: backIcon,
  alt: '뒤로가기',
})`
  width: 24px;
  height: 24px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1; 
  min-height: 0; 
  justify-content: flex-start;
  align-items: stretch; 
  box-sizing: border-box;
  padding: 0 20px;
`;

export const StepZeroTitle = styled.h2`
  font-family: "Pretendard";
  font-size: 26px;
  font-weight: 600;
  line-height: 1.4;
  color: #000000;
  margin-top: 48px;
  margin-bottom: 180px;
  word-wrap: break-word;
`;

/* Step 공통 레이아웃 */
export const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
  min-height: 0;
`;

export const Title = styled.h2`
  font-family: "Pretendard";
  font-size: 26px;
  font-weight: 600;
  line-height: 1.4;
  color: #000000;
  margin-top: 48px;
  margin-bottom: 48px;
  word-wrap: break-word;
`;

/* ================= STEP 1 Styles (약관) ================= */
export const TermsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
`;

export const TermRow = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 0;
  cursor: pointer;
  margin-bottom: ${(props) => (props.$isHeader ? '8px' : '0px')};
`;

export const CheckIcon = styled(Check)`
  width: 24px;
  height: 24px;
  margin-right: 12px;
  color: ${(props) => (props.checked ? '#FF8E3D' : 'var(--Gray_3)')};
`;

export const TermText = styled.span`
  font-family : "Pretendard";
  font-size: ${(props) => (props.$isHeader ? '18px' : '14px')};
  font-weight: ${(props) => (props.$isHeader ? '700' : '500')};
  color: ${(props) => (props.$isHeader ? '#1E1E1E' : '#5E5E5E')};
  flex: 1;
`;

export const ArrowIcon = styled.img.attrs({
  src: arrowIcon,
  alt: '다음',
})`
  width: 16px;
  height: 16px;
`;

export const Divider = styled.div`
  height: 1px;
  background-color: #f2f2f7;
  margin-bottom: 12px;
`;

export const SubDescription = styled.p`
  font-size: 12px;
  font-family: "Pretendard";
  font-weight: 400;
  color: #A7A7A7;
  line-height: 16.80px;
  word-wrap: break-word;
  padding-left: 30px;
  margin-top: -4px;
`;

/* ================= STEP 2 & 3 Styles (폼 입력 & 프로필) ================= */
export const InputFormSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const InputLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #636366;
  margin-bottom: 8px;
`;

export const ErrorMessage = styled.span`
  font-size: 12px;
  color: #ff3b30;
  margin-top: 6px;
`;

export const ProfileImageContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto 32px auto;
`;

export const ProfileCircle = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #F5F5F5;
  border: 1px solid #CECECE;
`;

export const CameraBadge = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #ff9e59;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  border: 2px solid #ffffff;
`;

export const CameraIcon = styled.img.attrs({
  src: cameraIcon,
  alt: '카메라 아이콘',
})`
  width: 16px;  /* 32px 배지 안에서 적절하게 보일 크기 */
  height: 16px;

  filter: brightness(0) invert(1);
`;