const mongoose = require("mongoose");

const Crawlers = mongoose.model("Crawlers", {
  crawler_id: String,
  keyword: String,
  created_at: String,
});

module.exports = Crawlers;
