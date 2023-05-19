export type CrawlModel = {
  keyword: string;
  id: string;
  created_at: string;
};

export type CrawlDataModel = {
  id: string;
  status: "active" | "done";
  urls: string[];
};
