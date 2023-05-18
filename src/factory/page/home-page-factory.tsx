import { CrawlServiceModel } from "@/model/crawl-service";
import HomePage from "@/page/home-page";
import { crawlService } from "@/service/crawl.service";

type MakeHomePageProps = {
  crawlServiceProp?: CrawlServiceModel;
};

export const makeHomePage = ({
  crawlServiceProp = crawlService,
}: MakeHomePageProps = {}) => {
  return <HomePage crawlService={crawlServiceProp} />;
};
