"use client";
import { CONSTANT } from "@/constant/constant";
import { CrawlModel } from "@/model/crawl";
import { CrawlServiceModel } from "@/model/crawl-service";
import { useEffect, useState } from "react";
import { HomeCrawlList } from "./home-crawl-list/home-crawl-list";
import { HomePageContainer, HomePageLogo } from "./home-page-styles";
import HomeSearch from "./home-search/home-search";

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
      <HomeSearch
        keyword={keyword}
        setKeyword={setKeyword}
        onSearchClick={handleSearchClick}
      />
      <HomeCrawlList
        crawls={crawls}
        onAccordionClick={handleAccordionClick}
        selectedAccordionId={selectedAccordionId}
      />
    </HomePageContainer>
  );
}
