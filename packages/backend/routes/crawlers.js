const express = require("express");
const router = express.Router();
const Crawlers = require("../models/crawlers");

router.post("/", async (req, res) => {
  try {
    await Crawlers.create({
      crawler_id: req.body.crawler_id,
      keyword: req.body.keyword,
      created_at: req.body.created_at,
    });

    res.status(201).json({ message: "Crawl successfully inserted!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const crawlers = await Crawlers.find();

    res.status(201).json(crawlers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/", async (req, res) => {
  try {
    await Crawlers.collection.drop();

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
