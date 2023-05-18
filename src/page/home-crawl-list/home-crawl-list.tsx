"use client";
import { CrawlModel } from "@/model/crawl";
import _orderby from "lodash.orderby";
import {
  HomeCrawlAccordion,
  HomeCrawlContainer,
  HomeCrawlPanel,
} from "./home-crawl-styles";

type HomeCrawlListProps = {
  crawls: CrawlModel[];
  onAccordionClick: (crawlId: string) => void;
  selectedAccordionId: string;
};

export const HomeCrawlList = ({
  crawls,
  onAccordionClick,
  selectedAccordionId,
}: HomeCrawlListProps) => {
  return (
    <>
      {_orderby(crawls, "created_at", "desc").map((crawl: CrawlModel) => (
        <HomeCrawlContainer>
          <HomeCrawlAccordion
            key={crawl.id}
            onClick={() => onAccordionClick(crawl.id)}
          >
            {crawl.keyword}
          </HomeCrawlAccordion>
          <HomeCrawlPanel active={selectedAccordionId === crawl.id}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </HomeCrawlPanel>
        </HomeCrawlContainer>
      ))}
    </>
  );
};
