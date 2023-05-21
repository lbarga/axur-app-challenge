import { Crawler } from "../models/crawlers";
const request = require("supertest");
const express = require("express");
const router = require("./crawlers");

const app = express();
app.use(express.json());
app.use("/", router);

describe("/crawlers", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should create a crawler and return a success message", async () => {
    const requestData = {
      crawler_id: "test-id",
      keyword: "test-keyword",
      created_at: "test-date",
    };

    Crawler.prototype.save = jest.fn();

    const response = await request(app).post("/").send(requestData);

    expect(Crawler.prototype.save).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: "Crawl successfully inserted!" });
  });

  it("should handle errors and return an error response", async () => {
    const errorMessage = "Test error";

    Crawler.prototype.save = jest.fn().mockImplementation(() => {
      throw new Error(errorMessage);
    });

    const response = await request(app).post("/").send({});

    expect(Crawler.prototype.save).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: errorMessage });
  });

  it("should fetch all crawlers and return them as JSON", async () => {
    const crawlersData = [
      { id: 1, crawler_id: "id1", keyword: "keyword1", created_at: "date1" },
      { id: 2, crawler_id: "id2", keyword: "keyword2", created_at: "date2" },
    ];

    Crawler.find = jest.fn().mockResolvedValue(crawlersData);

    const response = await request(app).get("/");

    expect(Crawler.find).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(crawlersData);
  });

  it("should handle errors and return an error response", async () => {
    const errorMessage = "Test error";
    Crawler.find = jest.fn().mockRejectedValue(new Error(errorMessage));

    const response = await request(app).get("/");

    expect(Crawler.find).toHaveBeenCalled();
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: errorMessage });
  });

  it("should delete the Crawlers collection and return a success message", async () => {
    Crawler.collection.drop = jest.fn();

    const response = await request(app).delete("/");

    expect(Crawler.collection.drop).toHaveBeenCalled();
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Crawlers collection deleted successfully!",
    });
  });

  it("should handle errors when the Crawlers collection does not exist", async () => {
    Crawler.collection.drop = jest.fn().mockImplementation(() => {
      throw new Error();
    });

    const response = await request(app).delete("/");

    expect(Crawler.collection.drop).toHaveBeenCalled();
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "The Crawlers collection does not exist.",
    });
  });
});
