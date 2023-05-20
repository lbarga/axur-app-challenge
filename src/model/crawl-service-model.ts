import { AxiosResponse } from "axios";
import { CrawlDataModel, CrawlModel } from "./crawl-model";

export type PostCrawlData = {
  id: string;
};

export type GetCrawlData = CrawlDataModel;

export type CrawlServiceModel = {
  postCrawl: (keyword: string) => Promise<AxiosResponse<PostCrawlData, any>>;
  getCrawler: (id: string) => Promise<AxiosResponse<GetCrawlData, any>>;
  getCrawlers: () => CrawlModel[];
  deleteAllCrawlers: () => void;
};
