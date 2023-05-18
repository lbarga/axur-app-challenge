"use client";
import { CONSTANT } from "@/constant/constant";
import { CrawlModel } from "@/model/crawl";
import { CrawlServiceModel } from "@/model/crawl-service";
import _orderby from "lodash.orderby";
import { useEffect, useState } from "react";
import {
  Accordion,
  HomePageContainer,
  HomePageCrawlContainer,
  HomePageLogo,
  HomePageSearchButton,
  HomePageSearchContainer,
  HomePageSearchContent,
  HomePageSearchInput,
  Panel,
} from "./home-page-styles";

const { CRAWLS } = CONSTANT.LOCAL_STORAGE;

type HomePageProps = {
  crawlService: CrawlServiceModel;
};

export default function HomePage({ crawlService }: HomePageProps) {
  const [keyword, setKeyword] = useState("");
  const [crawls, setCrawls] = useState<CrawlModel[]>([]);
  const [selectedAccordionId, setSelectedAccordionId] = useState("");

  const fetchCrawls = () => {
    const crawlsString = localStorage.getItem(CRAWLS) || "[]";
    const currentCrawls = JSON.parse(crawlsString) as CrawlModel[];
    setCrawls(currentCrawls);
  };

  const clear = () => {
    setKeyword("");
    setSelectedAccordionId("");
  };

  const handleSearchClick = async () => {
    const {
      status,
      data: { id },
    } = await crawlService.postCrawlSearch(keyword);

    if (status === 200) {
      const crawlsString = localStorage.getItem(CRAWLS) || "[]";

      const currentCrawls = JSON.parse(crawlsString) as CrawlModel[];

      const created_at = new Date().toISOString();

      currentCrawls.push({ keyword, id, created_at });

      const currentCrawlsString = JSON.stringify(currentCrawls);

      localStorage.setItem(CRAWLS, currentCrawlsString);

      fetchCrawls();
      clear();
    }
  };

  const handleAccordionClick = (crawlId: string) => {
    if (crawlId === selectedAccordionId) {
      setSelectedAccordionId("");
      return;
    }
    setSelectedAccordionId(crawlId);
  };

  useEffect(() => {
    fetchCrawls();
  }, []);

  return (
    <HomePageContainer>
      <HomePageLogo
        src="/axur-logo.png"
        width={500}
        height={500}
        alt="axur-logo"
        data-testid="axur-logo"
      />
      <HomePageSearchContent>
        <HomePageSearchContainer>
          <HomePageSearchInput
            type="text"
            placeholder="keyword"
            value={keyword}
            onChange={(event) => {
              setKeyword(event.target.value);
            }}
          />
          <HomePageSearchButton onClick={handleSearchClick}>
            <i className="fa fa-search" aria-hidden="true"></i>
          </HomePageSearchButton>
        </HomePageSearchContainer>
      </HomePageSearchContent>
      <>
        {_orderby(crawls, "created_at", "desc").map((crawl: CrawlModel) => (
          <HomePageCrawlContainer>
            <Accordion
              key={crawl.id}
              onClick={() => handleAccordionClick(crawl.id)}
            >
              {crawl.keyword}
            </Accordion>
            <Panel active={selectedAccordionId === crawl.id}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Panel>
          </HomePageCrawlContainer>
        ))}
      </>
    </HomePageContainer>
  );
}
