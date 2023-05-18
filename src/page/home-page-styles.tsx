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
  margin: 40px 0px 40px 0px;
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

export const HomePageCrawlContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  width: 80%;
  align-items: center;
`;

export const Accordion = styled.button`
  display: flex;
  height: inherit;
  background-color: #fff;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
  border-radius: 8px;
  box-shadow: 0 0px 2px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  font-size: 24px;

  &:hover {
    background-color: #e9e9e9;
  }
`;

export const Panel = styled.div<{ active: boolean }>`
  display: flex;
  padding: 0 18px;
  background-color: #fff6eb;
  max-height: 0;
  overflow: hidden;
  box-shadow: 0 0px 1px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 0px 0px 8px 8px;
  padding: 16px;
  margin-top: 1px;
  display: none;

  ${(props) =>
    props.active &&
    `max-height: 999px; 
    display: flex;
  `}
`;
