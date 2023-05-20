import styled, { keyframes } from "styled-components";

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const SLoader = styled.i`
  display: flex;
  font-size: 80px;
  justify-content: center;
  align-items: center;
  animation: ${rotateAnimation} 2s linear infinite;
`;
