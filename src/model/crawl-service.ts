import { AxiosResponse } from "axios";

export type PostCrawlSearchResponse = {
  id: string;
};

export type CrawlServiceModel = {
  postCrawlSearch: (
    keyword: string
  ) => Promise<AxiosResponse<PostCrawlSearchResponse, any>>;
};
