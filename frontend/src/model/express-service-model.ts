import { AxiosResponse } from "axios";
import { CrawlerModel } from "./crawler-model";

export type ExpressServiceModel = {
  saveCrawler: (crawler: CrawlerModel) => Promise<AxiosResponse<any>>;
  getCrawlers: () => Promise<AxiosResponse<CrawlerModel[]>>;
};
