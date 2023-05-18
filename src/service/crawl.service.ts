import { PostCrawlSearchResponse } from "@/model/crawl-service";
import { AxiosResponse } from "axios";
import api from "../infra/api";

const BASE_URL = "/crawl";

const postCrawlSearch = async (
  keyword: string
): Promise<AxiosResponse<PostCrawlSearchResponse>> => {
  return api.post(BASE_URL, {
    keyword,
  });
};

export const crawlService = {
  postCrawlSearch,
};
