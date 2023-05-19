"use client";
import { CrawlDataModel, CrawlModel } from "@/model/crawl";
import _orderby from "lodash.orderby";
import {
  HomeCrawlAccordion,
  HomeCrawlContainer,
  HomeCrawlEmptyContainer,
  HomeCrawlLoader,
  HomeCrawlPanel,
  HomeCrawlPanelContainer,
  HomeCrawlRefreshButton,
  HomeCrawlStatusContainer,
  HomeCrawlStatusTag,
} from "./home-crawl-styles";

type HomeCrawlListProps = {
  crawls: CrawlModel[];
  onAccordionClick: (crawlId: string) => void;
  selectedAccordionId: string;
  loading: boolean;
  currentCrawl: CrawlDataModel | undefined;
  onClickRefresh: (crawlId: string) => void;
};

export const HomeCrawlList = ({
  crawls,
  onAccordionClick,
  selectedAccordionId,
  loading,
  currentCrawl,
  onClickRefresh,
}: HomeCrawlListProps) => {
  return (
    <>
      {_orderby(crawls, "created_at", "desc").map((crawl: CrawlModel) => {
        const isActive = selectedAccordionId === crawl.id;

        return (
          <HomeCrawlContainer key={crawl.id}>
            <HomeCrawlAccordion onClick={() => onAccordionClick(crawl.id)}>
              {crawl.keyword}
              {isActive && (
                <i className="fa fa-chevron-up" aria-hidden="true"></i>
              )}
              {!isActive && (
                <i className="fa fa-chevron-down" aria-hidden="true"></i>
              )}
            </HomeCrawlAccordion>
            <HomeCrawlPanel
              isactive={isActive.toString()}
              status={currentCrawl?.status || "active"}
            >
              <HomeCrawlPanelContainer>
                {loading && (
                  <HomeCrawlLoader
                    className="fa fa-refresh"
                    aria-hidden="true"
                  ></HomeCrawlLoader>
                )}
                {!loading && (
                  <>
                    <HomeCrawlStatusContainer>
                      <HomeCrawlStatusTag
                        status={currentCrawl?.status || "active"}
                      >
                        {currentCrawl?.status}
                      </HomeCrawlStatusTag>
                      {currentCrawl?.status === "active" && (
                        <HomeCrawlRefreshButton
                          onClick={() => onClickRefresh(crawl.id)}
                        >
                          <i className="fa fa-refresh" aria-hidden="true"></i>
                        </HomeCrawlRefreshButton>
                      )}
                    </HomeCrawlStatusContainer>
                    {currentCrawl?.urls.map((url) => (
                      <a href={url} key={url}>
                        {url}
                      </a>
                    ))}
                    {currentCrawl?.urls.length === 0 && (
                      <HomeCrawlEmptyContainer>
                        <p>We did not find any records for your search.</p>
                      </HomeCrawlEmptyContainer>
                    )}
                  </>
                )}
              </HomeCrawlPanelContainer>
            </HomeCrawlPanel>
          </HomeCrawlContainer>
        );
      })}
    </>
  );
};
