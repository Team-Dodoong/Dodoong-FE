import styled from 'styled-components';
import Back from '../../../assets/ic_back_24.svg?react';

export const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 430px;
  min-height: 100vh;
  margin: 0 auto;
  background: #ffffff;
  font-family: -apple-system, sans-serif;
`;

export const Header = styled.div`
  position: relative;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px #F1F1F1 solid;
`;

/* export const BackButton = styled.button`
  position: absolute;
  left: 20px;
  background: none;
  border: none;
  font-size: 20px;
  color: #333333;
  cursor: pointer;
`; */

export const HeaderTitle = styled.h1`
  font-size: 18px;
  font-weight: 700;
  color: #111111;
`;

export const AvatarSection = styled.div`
  display: flex;
  justify-content: center;
  padding: 24px 0;
`;

export const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
`;

export const InfoGroup = styled.div`
  padding: 12px 20px;
`;

export const Label = styled.div`
  margin-bottom: 6px;
  font-size: 13px;
  color: #aaaaaa;
`;

export const ValueRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 32px;
`;

export const ValueText = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #111111;
`;

export const Arrow = styled.div`
  width: 8px;
  height: 8px;
  border-top: 2px solid #cccccc;
  border-right: 2px solid #cccccc;
  transform: rotate(45deg);
`;

export const CopyButton = styled.button`
  padding: 4px 10px;
  background: #111111;
  border: none;
  border-radius: 4px;
  color: #ffffff;
  font-size: 12px;
  cursor: pointer;
`;

export const ActionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  font-size: 16px;
  font-weight: 500;
  color: #333333;
  cursor: pointer;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
`;

export const ModalBox = styled.div`
  width: 100%;
  max-width: 480px;
  padding: 40px 20px 24px 20px;
  background: #ffffff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-sizing: border-box;
  text-align: center;
`;

export const ModalTitle = styled.h3`
  margin-bottom: 32px;
  font-size: 18px;
  font-weight: 700;
  color: #111111;
`;

export const ModalButtons = styled.div`
  display: flex;
  gap: 12px;
`;

export const ModalButton = styled.button`
  flex: 1;
  height: 52px;
  background-color: ${(props) => (props.confirm ? '#1c1c1e' : '#f0f0f0')};
  border: none;
  border-radius: 8px;
  color: ${(props) => (props.confirm ? '#ffffff' : '#555555')};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

export const BackButton = styled(Back)`
  color: var(--Gray_5);
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  left: 20px;
  background: none;
`;