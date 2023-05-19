import { AxiosResponse } from "axios";
import { CrawlDataModel } from "./crawl";

export type PostCrawlData = {
  id: string;
};

export type GetCrawlData = CrawlDataModel;

export type CrawlServiceModel = {
  postCrawl: (keyword: string) => Promise<AxiosResponse<PostCrawlData, any>>;
  getCrawl: (id: string) => Promise<AxiosResponse<GetCrawlData, any>>;
};
