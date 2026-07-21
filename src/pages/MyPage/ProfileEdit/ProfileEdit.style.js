import styled from 'styled-components';
import { Regular_14 } from "../../../styles/Fonts";


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
  border-bottom: 1px solid #f0f0f0;
`;

export const HeaderTitle = styled.h1`
  font-size: 18px;
  font-weight: 700;
  color: #111111;
`;

export const CancelButton = styled.button`
  position: absolute;
  right: 20px;
  background: none;
  border: none;
  font-size: 16px;
  color: #666666;
  cursor: pointer;
`;

export const AvatarContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  margin: 32px auto;
  cursor: pointer;
`;

export const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;

export const AddBadge = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #111111;
  border-radius: 50%;
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
`;

export const FormGroup = styled.div`
  margin-bottom: 24px;
  padding: 0 20px;
`;

export const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const Label = styled.label`
  font-size: 16px;
  font-weight: 700;
  color: #111111;
`;

export const Count = styled.span`
  font-size: 14px;
  color: #aaaaaa;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 40px 0 14px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 15px;
  color: #333333;

  &:focus {
    border-color: #111111;
    outline: none;
  }
`;

export const ClearButton = styled.button`
  position: absolute;
  right: 12px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #aaaaaa;
  border: none;
  border-radius: 50%;
  color: #ffffff;
  font-size: 12px;
  cursor: pointer;
`;

export const TextAreaWrapper = styled.div`
  position: relative;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 140px;
  padding: 14px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  box-sizing: border-box;
  ${Regular_14}
  color: var(--Gray_4);
  resize: none;

  &:focus {
    border-color: #111111;
    outline: none;
  }
`;

export const SubmitButton = styled.button`
  position: absolute;
  bottom: 24px;
  left: 20px;
  right: 20px;
  height: 52px;
  background-color: #1c1c1e;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;