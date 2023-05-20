"use client";
import { useGlobalLoaderContext } from "@/context/global-loader-context";
import { AxrengServiceModel } from "@/model/axreng-service-model";
import { CrawlDataModel } from "@/model/crawl-model";
import { CrawlerModel } from "@/model/crawler-model";
import { ExpressServiceModel } from "@/model/express-service-model";
import { useEffect, useState } from "react";
import { HomeCrawlList } from "./home-crawl-list/home-crawl-list";
import { HomePageContainer, HomePageLogo } from "./home-page-styles";
import HomeSearch from "./home-search/home-search";

type HomePageProps = {
  axrengService: AxrengServiceModel;
  expressService: ExpressServiceModel;
};

export default function HomePage({
  axrengService,
  expressService,
}: HomePageProps) {
  const [keyword, setKeyword] = useState("");
  const [crawlers, setCrawlers] = useState<CrawlerModel[]>([]);
  const [selectedAccordionId, setSelectedAccordionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentCrawl, setCurrentCrawl] = useState<CrawlDataModel>();
  const [lessThan3Letters, setLessThan3Letters] = useState(false);
  const globalLoaderContext = useGlobalLoaderContext();

  const fetchCrawlers = async () => {
    globalLoaderContext.setLoading(true);

    const { data: crawlers } = await expressService.getCrawlers();

    setCrawlers(crawlers);

    globalLoaderContext.setLoading(false);
  };

  const handleClickRefresh = async (crawlId: string) => {
    setLoading(true);

    const response = await axrengService.getCrawlDetails(crawlId);

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

    globalLoaderContext.setLoading(true);

    const {
      status,
      data: { id },
    } = await axrengService.searchCrawl(keyword);

    if (status === 200) {
      const created_at = new Date().toISOString();

      const crawler: CrawlerModel = { crawler_id: id, keyword, created_at };

      await expressService.saveCrawler(crawler);

      fetchCrawlers();

      clear();

      globalLoaderContext.setLoading(false);
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

  const handleClearAllClick = async () => {
    globalLoaderContext.setLoading(true);

    try {
      await expressService.deleteAllCrawlers();
    } catch (error) {
      globalLoaderContext.setLoading(false);
    }

    fetchCrawlers();

    globalLoaderContext.setLoading(false);
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
        crawlers={crawlers}
        onAccordionClick={handleAccordionClick}
        selectedAccordionId={selectedAccordionId}
        loading={loading}
        currentCrawl={currentCrawl}
        onClickRefresh={handleClickRefresh}
      />
    </HomePageContainer>
  );
}
