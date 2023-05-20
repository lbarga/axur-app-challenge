const request = require("supertest");
const express = require("express");
const router = require("./crawlers"); // Substitua pelo caminho correto para o arquivo que contém a rota
const Crawlers = require("../models/crawlers");

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

    Crawlers.create = jest.fn().mockResolvedValue();

    const response = await request(app).post("/").send(requestData);

    expect(Crawlers.create).toHaveBeenCalledWith(requestData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: "Crawl successfully inserted!" });
  });

  it("should handle errors and return an error response", async () => {
    const errorMessage = "Test error";
    Crawlers.create = jest.fn().mockRejectedValue(new Error(errorMessage));

    const response = await request(app).post("/").send({});

    expect(Crawlers.create).toHaveBeenCalled();

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: errorMessage });
  });

  it("should fetch all crawlers and return them as JSON", async () => {
    const crawlersData = [
      { id: 1, crawler_id: "id1", keyword: "keyword1", created_at: "date1" },
      { id: 2, crawler_id: "id2", keyword: "keyword2", created_at: "date2" },
    ];

    Crawlers.find = jest.fn().mockResolvedValue(crawlersData);

    const response = await request(app).get("/");

    expect(Crawlers.find).toHaveBeenCalled();
    expect(response.status).toBe(201);
    expect(response.body).toEqual(crawlersData);
  });

  it("should handle errors and return an error response", async () => {
    const errorMessage = "Test error";
    Crawlers.find = jest.fn().mockRejectedValue(new Error(errorMessage));

    const response = await request(app).get("/");

    expect(Crawlers.find).toHaveBeenCalled();
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: errorMessage });
  });

  it("should delete the Crawlers collection and return a success message", async () => {
    Crawlers.collection = { drop: jest.fn().mockResolvedValue() };

    const response = await request(app).delete("/");

    expect(Crawlers.collection.drop).toHaveBeenCalled();
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Crawlers collection deleted successfully!",
    });
  });

  it("should handle errors when the Crawlers collection does not exist", async () => {
    Crawlers.collection = { drop: jest.fn().mockRejectedValue(new Error()) };

    const response = await request(app).delete("/");

    expect(Crawlers.collection.drop).toHaveBeenCalled();
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "The Crawlers collection does not exist.",
    });
  });
});
