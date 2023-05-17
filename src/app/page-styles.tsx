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

export const HomePageSearchContent = styled.div`
  display: flex;
  margin-top: 40px;
`;

export const HomePageSearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  display: flex;
  z-index: 3;
  height: 44px;
  background: #fff;
  border: 1px solid #dfe1e5;
  box-shadow: none;
  border-radius: 24px;
  width: auto;
  max-width: 584px;
  padding: 0px 0px 0px 16px;
  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`;

export const HomePageSearchInput = styled.input`
  display: flex;
  outline: none;
  border: none;
  font-size: 24px;
`;

export const HomePageIcon = styled.i`
  color: #7c7c7c;
  margin-right: 16px;
`;

export const HomePageSearchButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  text-align: center;
  height: 100%;
  border-radius: 0px 24px 24px 0px;
  padding: 0px 16px 0px 16px;
  color: #2a2724;
  background-color: #f28e3b;

  &:hover {
    font-weight: bold;
    background-color: #ff7300;
  }
`;

export const HomePageLogo = styled(Image)`
  height: 92px;
  aspect-ratio: auto 272 / 92;
  width: 272px;
`;
