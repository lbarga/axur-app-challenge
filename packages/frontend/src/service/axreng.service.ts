import { AxiosResponse } from "axios";
import axrengAPI from "../infra/axreng-api";
import {
  AxrengServiceModel,
  GetCrawlData,
  PostCrawlData,
} from "../model/axreng-service-model";

const BASE_URL = "/crawl";

const searchCrawl = async (
  keyword: string
): Promise<AxiosResponse<PostCrawlData>> => {
  return axrengAPI.post(BASE_URL, {
    keyword,
  });
};

const getCrawlDetails = async (
  id: string
): Promise<AxiosResponse<GetCrawlData>> => {
  return axrengAPI.get(`${BASE_URL}/${id}`);
};

export const axrengService: AxrengServiceModel = {
  searchCrawl,
  getCrawlDetails,
};
