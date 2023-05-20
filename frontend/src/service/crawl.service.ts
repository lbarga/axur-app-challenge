import { CONSTANT } from "@/constant/constant";
import { CrawlModel } from "@/model/crawl-model";
import { PostCrawlData } from "@/model/crawl-service-model";
import { AxiosResponse } from "axios";
import api from "../infra/api";
import { GetCrawlData } from "../model/crawl-service-model";

const BASE_URL = "/crawl";

const { CRAWLERS: CRAWLS } = CONSTANT.LOCAL_STORAGE;

const postCrawl = async (
  keyword: string
): Promise<AxiosResponse<PostCrawlData>> => {
  return api.post(BASE_URL, {
    keyword,
  });
};

const getCrawler = async (id: string): Promise<AxiosResponse<GetCrawlData>> => {
  return api.get(`${BASE_URL}/${id}`);
};

const getCrawlers = (): CrawlModel[] => {
  const crawlersString = localStorage.getItem(CRAWLS) || "[]";
  const crawlers = JSON.parse(crawlersString) as CrawlModel[];

  return crawlers;
};

const deleteAllCrawlers = () => {
  const empty = JSON.stringify([]);

  localStorage.setItem(CRAWLS, empty);
};

export const crawlService = {
  postCrawl,
  getCrawler,
  getCrawlers,
  deleteAllCrawlers,
};
