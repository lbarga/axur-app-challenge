import styled from "styled-components";

export const HomeSearchContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 0px 40px 0px;
  justify-content: center;
  align-items: center;
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
  margin-bottom: 16px;

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

export const HomeSearchError = styled.p`
  margin: 0px;
  display: flex;
  color: red;
  font-size: 12px;
  margin-bottom: 16px;
`;

export const HomeSearchClearAllButton = styled.button`
  display: flex;
  border: none;
  background-color: #ff0000;
  font-size: 16px;
  border-radius: 16px;
  font-weight: bold;
  padding: 6px;
  color: #ffffff;
  cursor: pointer;

  &:hover {
    background-color: #ff2121;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`;
