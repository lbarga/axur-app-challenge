"use client";
import Loader from "@/component/loader/loader";
import { STRING } from "@/constant/string";
import { CrawlDataModel } from "@/model/crawl-model";
import { CrawlerModel } from "@/model/crawler-model";
import { normalizeDate } from "@/utils/date-formatter";
import _orderby from "lodash.orderby";
import {
  HomeCrawlAccordion,
  HomeCrawlContainer,
  HomeCrawlEmptyContainer,
  HomeCrawlKeyword,
  HomeCrawlPanel,
  HomeCrawlPanelContainer,
  HomeCrawlRefreshButton,
  HomeCrawlStatusContainer,
  HomeCrawlStatusTag,
} from "./home-crawl-styles";

type HomeCrawlListProps = {
  crawlers: CrawlerModel[];
  onAccordionClick: (crawlId: string) => void;
  selectedAccordionId: string;
  loading: boolean;
  currentCrawl: CrawlDataModel | undefined;
  onClickRefresh: (crawlId: string) => void;
};

const { LINKS_FOUND, NOT_FOUND_RECORDS, CARRYING_OUT_SEARCH } = STRING;

export const HomeCrawlList = ({
  crawlers,
  onAccordionClick,
  selectedAccordionId,
  loading,
  currentCrawl,
  onClickRefresh,
}: HomeCrawlListProps) => {
  return (
    <>
      {_orderby(crawlers, "created_at", "desc").map((crawl: CrawlerModel) => {
        const isActive = selectedAccordionId === crawl.crawler_id;

        return (
          <HomeCrawlContainer key={crawl.crawler_id}>
            <HomeCrawlAccordion
              onClick={() => onAccordionClick(crawl.crawler_id)}
              data-testid={`accordion-button-${crawl.crawler_id}`}
            >
              <HomeCrawlKeyword>{crawl.keyword}</HomeCrawlKeyword>
              <div>{normalizeDate(crawl.created_at)}</div>
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
              loading={loading.toString()}
            >
              <HomeCrawlPanelContainer>
                {loading && <Loader />}
                {!loading && isActive && (
                  <>
                    <HomeCrawlStatusContainer>
                      <HomeCrawlStatusTag
                        status={currentCrawl?.status || "active"}
                      >
                        {currentCrawl?.status}
                      </HomeCrawlStatusTag>
                      <div>
                        <p>
                          {LINKS_FOUND}
                          {currentCrawl?.urls.length}{" "}
                        </p>
                      </div>
                      {currentCrawl?.status === "active" && (
                        <HomeCrawlRefreshButton
                          onClick={() => onClickRefresh(crawl.crawler_id)}
                          data-testid="refresh-button"
                        >
                          <i className="fa fa-refresh" aria-hidden="true"></i>
                        </HomeCrawlRefreshButton>
                      )}
                      {currentCrawl?.status !== "active" && <div />}
                    </HomeCrawlStatusContainer>
                    {currentCrawl?.urls.map((url: string) => (
                      <a href={url} key={url}>
                        {url}
                      </a>
                    ))}
                    {currentCrawl?.urls.length === 0 &&
                      currentCrawl.status !== "active" && (
                        <HomeCrawlEmptyContainer>
                          <p>{NOT_FOUND_RECORDS}</p>
                        </HomeCrawlEmptyContainer>
                      )}
                    {currentCrawl?.urls.length === 0 &&
                      currentCrawl.status === "active" && (
                        <HomeCrawlEmptyContainer>
                          <p>{CARRYING_OUT_SEARCH} </p>
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
