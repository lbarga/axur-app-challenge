import expressAPI from "@/infra/express-api";
import { CrawlerModel } from "@/model/crawler-model";
import { AxiosResponse } from "axios";
import { ExpressServiceModel } from "./../model/express-service-model";

const BASE_URL = "/crawlers";

const saveCrawler = async (
  crawler: CrawlerModel
): Promise<AxiosResponse<any>> => {
  return expressAPI.post(BASE_URL, crawler);
};

const getCrawlers = async (): Promise<AxiosResponse<CrawlerModel[]>> => {
  return expressAPI.get(BASE_URL);
};

export const expressService: ExpressServiceModel = {
  saveCrawler,
  getCrawlers,
};
