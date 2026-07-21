import styled from 'styled-components';


export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8px;
`;

export const GreetingBubble = styled.p`
  font-family : "Pretendard";
  font-size : 14px;
  padding: 10px 16px;
  border-radius: 16px;
  background-color: #D9D9D9;
  color: #707070;
  text-align: center;

  strong {
    color: var(--Main);
    font-weight: 700;
  }
`;

export const CharacterArea = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
  padding: 24px 0 8px;
  border-radius: 24px;
  background: radial-gradient(
    circle at 50% 35%,
    #FFF1E4 0%,
    #FFFFFF 72%
  );
`;

export const CharacterImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: contain;
`;

export const Decoration = styled.span`
  position: absolute;
  font-size: 20px;
  ${({ $position }) => $position}
`;

export const CharacterName = styled.p`
  font-family : "Jalnan2";
  font-size : 16px;
  margin-top: 6px;
  color: #000000;
`;

export const ProgressWrapper = styled.div`
  width: 100%;
  margin-top: 14px;
`;

export const ProgressTrack = styled.div`
  width: 100%;
  height: 8px;
  border-radius: 999px;
  background-color: var(--Gray_5);
  overflow: hidden;
`;

export const ProgressFill = styled.div`
  height: 100%;
  border-radius: 999px;
  background-color: var(--Main);
  width: ${({ $percent }) => $percent}%;
  transition: width 0.4s ease;
`;

export const ProgressLabel = styled.p`
  font-family : "Pretendard";
  font-size : 10px;
  margin-top: 6px;
  text-align: right;
  color: var(--Gray_5);
`;
