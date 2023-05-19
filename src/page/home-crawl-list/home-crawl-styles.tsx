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
  align-items: center;
  justify-content: space-between;

  &:hover {
    background-color: #e9e9e9;
  }
`;

export const HomeCrawlPanel = styled.div<{
  isactive: string;
  status: "active" | "done";
}>`
  display: flex;
  padding: 0 18px;
  max-height: 0;
  overflow: hidden;
  box-shadow: 0 0px 1px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 0px 0px 8px 8px;
  margin-top: 1px;
  transition: max-height 0.5s ease-in-out;
  width: -webkit-fill-available;\

  ${(props) => props.isactive === "true" && `max-height: 9999px;`}
  ${(props) => props.status === "active" && `background-color: #fff6eb;`}
  ${(props) => props.status === "done" && `background-color: #f1fff2;`}
`;

export const HomeCrawlPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  width: -webkit-fill-available;
`;

export const HomeCrawlStatusContainer = styled.div`
  display: flex;
  gap: 16px;
  justify-content: space-between;
  align-items: center;
`;

export const HomeCrawlRefreshButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 24px;
  cursor: pointer;
  border-radius: 50px;
  padding: 8px;

  &:hover {
    color: #505050;
  }
`;

export const HomeCrawlStatusTag = styled.div<{ status: "active" | "done" }>`
  display: flex;
  border-radius: 16px;
  padding: 8px;
  font-size: 13px;
  font-weight: bold;
  color: #ffffff;

  ${(props) => props.status === "active" && `background-color: #e94f1f;`}
  ${(props) => props.status === "done" && `background-color:#239a00;`}
`;

export const HomeCrawlEmptyContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const HomeCrawlLoader = styled.i`
  display: flex;
  font-size: 80px;
  justify-content: center;
  align-items: center;
`;
