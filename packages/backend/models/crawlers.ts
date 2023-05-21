import { Schema, model } from "mongoose";

interface ICrawler {
  crawler_id: String;
  keyword: String;
  created_at: String;
}

const crawlerSchema = new Schema<ICrawler>({
  crawler_id: { type: String, required: true },
  keyword: { type: String, required: true },
  created_at: { type: String, required: true },
});

export const Crawler = model<ICrawler>("Crawlers", crawlerSchema);
