import styled from "styled-components";

export const HomeCrawlContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  width: 80%;
  align-items: center;
`;

export const HomeCrawlAccordion = styled.button`
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

export const HomeCrawlPanel = styled.div<{ active: boolean }>`
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
