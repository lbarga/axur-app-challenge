import { AxiosResponse } from "axios";
import { CrawlDataModel } from "./crawl-model";

export type PostCrawlData = {
  id: string;
};

export type GetCrawlData = CrawlDataModel;

export type AxrengServiceModel = {
  searchCrawl: (keyword: string) => Promise<AxiosResponse<PostCrawlData, any>>;
  getCrawlDetails: (id: string) => Promise<AxiosResponse<GetCrawlData, any>>;
};
