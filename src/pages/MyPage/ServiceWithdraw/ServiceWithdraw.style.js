import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 430px;
  min-height: 100vh;
  margin: 0 auto;
  padding-bottom: 100px;
  background: #ffffff;
  font-family: -apple-system, sans-serif;
`;

export const Header = styled.div`
  position: relative;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BackButton = styled.button`
  position: absolute;
  left: 20px;
  background: none;
  border: none;
  font-size: 20px;
  color: #333333;
  cursor: pointer;
`;

export const HeaderTitle = styled.h1`
  font-size: 18px;
  font-weight: 700;
  color: #111111;
`;

export const Content = styled.div`
  padding: 32px 20px 24px 20px;
`;

export const MainTitle = styled.h2`
  margin-bottom: 24px;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.4;
  color: #111111;
`;

export const NoticeList = styled.ul`
  margin-bottom: 28px;
  padding-left: 14px;
`;

export const NoticeItem = styled.li`
  margin-bottom: 12px;
  list-style-type: disc;
  font-size: 14px;
  line-height: 1.6;
  color: #666666;
`;

export const PointHighlight = styled.div`
  margin-bottom: 6px;
  font-size: 16px;
  font-weight: 700;
  color: #111111;
`;

export const PointLink = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: #999999;
  cursor: pointer;
`;

export const CheckboxSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px 20px;
  background-color: #f8f9fa;
`;

export const CheckboxRow = styled.div`
  display: flex;
  gap: 12px;
  cursor: pointer;
`;

export const CheckCircle = styled.div`
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background-color: ${(props) => (props.active ? props.color || '#111111' : '#ffffff')};
  border: 1px solid ${(props) => (props.active ? props.color || '#111111' : '#cccccc')};
  border-radius: 50%;
  color: #ffffff;
  font-size: 11px;
`;

export const CheckboxLabel = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
  color: #444444;
`;

export const SubmitButton = styled.button`
  position: absolute;
  bottom: 24px;
  left: 20px;
  right: 20px;
  height: 52px;
  background-color: ${(props) => (props.disabled ? '#cccccc' : '#000000')};
  border: none;
  border-radius: 8px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;