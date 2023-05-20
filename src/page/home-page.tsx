"use client";
import { CONSTANT } from "@/constant/constant";
import { CrawlDataModel, CrawlModel } from "@/model/crawl-model";
import { CrawlServiceModel } from "@/model/crawl-service-model";
import { useEffect, useState } from "react";
import { HomeCrawlList } from "./home-crawl-list/home-crawl-list";
import { HomePageContainer, HomePageLogo } from "./home-page-styles";
import HomeSearch from "./home-search/home-search";

const { CRAWLERS: CRAWLS } = CONSTANT.LOCAL_STORAGE;

type HomePageProps = {
  crawlService: CrawlServiceModel;
};

export default function HomePage({ crawlService }: HomePageProps) {
  const [keyword, setKeyword] = useState("");
  const [crawlers, setCrawlers] = useState<CrawlModel[]>([]);
  const [selectedAccordionId, setSelectedAccordionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentCrawl, setCurrentCrawl] = useState<CrawlDataModel>();
  const [lessThan3Letters, setLessThan3Letters] = useState(false);

  const fetchCrawlers = () => {
    const crawls = crawlService.getCrawlers();
    setCrawlers(crawls);
  };

  const handleClickRefresh = async (crawlId: string) => {
    setLoading(true);

    const response = await crawlService.getCrawler(crawlId);

    if (response.status === 200) {
      setLoading(false);

      setCurrentCrawl(response.data);
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
      const crawlers = crawlService.getCrawlers();

      const created_at = new Date().toISOString();

      crawlers.push({ keyword, id, created_at });

      const currentCrawlersString = JSON.stringify(crawlers);

      localStorage.setItem(CRAWLS, currentCrawlersString);

      fetchCrawlers();

      clear();
    }
  };

  const handleAccordionClick = async (crawlId: string) => {
    if (crawlId === selectedAccordionId) {
      setSelectedAccordionId("");
      return;
    }

    setSelectedAccordionId(crawlId);

    handleClickRefresh(crawlId);
  };

  const handleClearAllClick = () => {
    crawlService.deleteAllCrawlers();

    fetchCrawlers();
  };

  useEffect(() => {
    fetchCrawlers();
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
        crawls={crawlers}
        onAccordionClick={handleAccordionClick}
        selectedAccordionId={selectedAccordionId}
        loading={loading}
        currentCrawl={currentCrawl}
        onClickRefresh={handleClickRefresh}
      />
    </HomePageContainer>
  );
}
