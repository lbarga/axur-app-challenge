import Image from "next/image";
import styled from "styled-components";

export const HomePageContainer = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
  align-items: center;
  flex-direction: column;
  padding-top: 5%;
`;

export const HomePageIcon = styled.i`
  color: #7c7c7c;
  margin-right: 16px;
`;

export const HomePageLogo = styled(Image)`
  height: 92px;
  aspect-ratio: auto 272 / 92;
  width: 272px;
`;
