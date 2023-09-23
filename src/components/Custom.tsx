import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 135px 380px;

  @media (max-width: 1400px) {
    margin: 135px 100px;
  }

  @media (max-width: 700px) {
    margin: 135px 30px;
  }
`;

const rotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const CircularProgress = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 6px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #000;
  animation: ${rotateAnimation} 1s linear infinite;
`;
