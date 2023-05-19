"use client";
import { CONSTANT } from "@/constant/constant";
import { CrawlDataModel, CrawlModel } from "@/model/crawl";
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
  const [loading, setLoading] = useState(false);
  const [currentCrawl, setCurrentCrawl] = useState<CrawlDataModel>();
  const [lessThan3Letters, setLessThan3Letters] = useState(false);

  const fetchCrawls = () => {
    const crawlsString = localStorage.getItem(CRAWLS) || "[]";
    const currentCrawls = JSON.parse(crawlsString) as CrawlModel[];
    setCrawls(currentCrawls);
  };

  const fetchCurrentCrawl = async (crawlId: string) => {
    console.log("crawlId: ", crawlId);

    setLoading(true);

    const response = await crawlService.getCrawl(crawlId);

    if (response.status === 200) {
      setLoading(false);

      setCurrentCrawl(response.data);

      console.log("response.data: ", response.data);
    }
  };

  const clear = () => {
    setKeyword("");
    setSelectedAccordionId("");
  };

  const handleSearchClick = async () => {
    if (keyword.length <= 3) {
      setLessThan3Letters(true);

      return;
    }

    setLessThan3Letters(false);

    const {
      status,
      data: { id },
    } = await crawlService.postCrawl(keyword);

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

  const handleAccordionClick = async (crawlId: string) => {
    if (crawlId === selectedAccordionId) {
      setSelectedAccordionId("");
      return;
    }

    setSelectedAccordionId(crawlId);

    fetchCurrentCrawl(crawlId);
  };

  const handleClearAllClick = () => {
    const empty = JSON.stringify([]);

    localStorage.setItem(CRAWLS, empty);

    fetchCrawls();
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
        lessThan3Letters={lessThan3Letters}
        onClearAllClick={handleClearAllClick}
      />
      <HomeCrawlList
        crawls={crawls}
        onAccordionClick={handleAccordionClick}
        selectedAccordionId={selectedAccordionId}
        loading={loading}
        currentCrawl={currentCrawl}
        onClickRefresh={fetchCurrentCrawl}
      />
    </HomePageContainer>
  );
}
