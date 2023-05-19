import { PostCrawlData } from "@/model/crawl-service";
import { AxiosResponse } from "axios";
import api from "../infra/api";
import { GetCrawlData } from "./../model/crawl-service";

const BASE_URL = "/crawl";

const postCrawl = async (
  keyword: string
): Promise<AxiosResponse<PostCrawlData>> => {
  return api.post(BASE_URL, {
    keyword,
  });
};

const getCrawl = async (id: string): Promise<AxiosResponse<GetCrawlData>> => {
  return api.get(`${BASE_URL}/${id}`);
};

export const crawlService = {
  postCrawl,
  getCrawl,
};
