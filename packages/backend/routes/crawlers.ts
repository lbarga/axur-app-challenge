import express, { Request, Response } from "express";
import { Crawler } from "../models/crawlers";
const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const crawler = new Crawler({
      crawler_id: req.body.crawler_id,
      keyword: req.body.keyword,
      created_at: req.body.created_at,
    });

    await crawler.save();

    res.status(201).json({ message: "Crawl successfully inserted!" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const crawlers = await Crawler.find();

    res.status(201).json(crawlers);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/", async (req: Request, res: Response) => {
  try {
    await Crawler.collection.drop();

    res
      .status(200)
      .json({ message: "Crawlers collection deleted successfully!" });
  } catch (error) {
    res
      .status(404)
      .json({ message: "The Crawlers collection does not exist." });
  }
});

module.exports = router;
