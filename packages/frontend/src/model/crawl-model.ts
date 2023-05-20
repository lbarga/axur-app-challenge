export type CrawlDataModel = {
  id: string;
  status: "active" | "done";
  urls: string[];
};
