import { STRING } from "@/constant/string";
import { makeHomePage } from "@/factory/page/home-page-factory";
import { CrawlServiceModel } from "@/model/crawl-service-model";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const { LINKS_FOUND, NOT_FOUND_RECORDS, CARRYING_OUT_SEARCH } = STRING;

const mockCrawlersList = [
  {
    id: "LXUDKgJG",
    keyword: "something",
    created_at: "2023-05-19T21:02:23.390Z",
  },
  {
    id: "cVsLBz7b",
    keyword: "new one",
    created_at: "2023-05-19T21:06:59.721Z",
  },
  {
    id: "mTrZzD1u",
    keyword: "new two",
    created_at: "2023-05-20T21:06:59.721Z",
  },
];

const mockCrawlDataStatusDoneWithoutLinks = {
  id: "cVsLBz7b",
  status: "done",
  urls: [],
};

const mockCrawlDataStatusDoneWithLinks = {
  id: "LXUDKgJG",
  status: "done",
  urls: [
    "http://hiring.axreng.com/htmlman1/ldapsearch.1.html",
    "http://hiring.axreng.com/htmlman1/setpriv.1.html",
    "http://hiring.axreng.com/htmlman1/shred.1.html",
  ],
};

const mockCrawlDataStatusActiveWithoutLinks = {
  id: "LXUDKgJG",
  status: "active",
  urls: [],
};

const mockCrawlDataStatusActiveWithLinks = {
  id: "LXUDKgJG",
  status: "active",
  urls: [
    "http://hiring.axreng.com/htmlman1/ldapsearch.1.html",
    "http://hiring.axreng.com/htmlman1/setpriv.1.html",
    "http://hiring.axreng.com/htmlman1/shred.1.html",
  ],
};

const mockCrawlService = {
  getCrawlDetails: jest.fn(async () => {
    return {
      status: 200,
      data: mockCrawlDataStatusDoneWithoutLinks,
    };
  }),
  searchCrawl: jest.fn(async () => {
    return {
      status: 200,
      data: { id: "p8Kd0kRS" },
    };
  }),
  getCrawlers: jest.fn(() => mockCrawlersList),
  deleteAllCrawlers: jest.fn(),
};

const setup = (mockService: any = mockCrawlService) => {
  const utils = render(
    makeHomePage({
      crawlServiceProp: mockService as unknown as CrawlServiceModel,
    })
  );
  const input = screen.findByPlaceholderText(
    "keyword"
  ) as unknown as HTMLInputElement;
  return {
    input,
    ...utils,
  };
};

describe("Home", () => {
  it("should render home correctly", async () => {
    setup();

    const heading = await screen.findByTestId("axur-logo");

    expect(heading).toBeInTheDocument();
  });

  it("should change input value", async () => {
    const { input } = setup();

    waitFor(async () => {
      fireEvent.change(input, { target: { value: "something" } });

      expect(input.value).toBe("something");
    });
  });

  it("should call searchCrawl with input value", async () => {
    const { input } = setup();

    waitFor(async () => {
      fireEvent.change(input, { target: { value: "something" } });

      expect(input.value).toBe("something");

      const searchButton = await screen.findByTestId("search-button");

      fireEvent.click(searchButton);

      expect(mockCrawlService.searchCrawl).toBeCalledWith("something");
    });
  });

  it("should render list of crawls correctly", async () => {
    setup();

    const first_item = await screen.findByTestId(
      `accordion-button-${mockCrawlersList[0].id}`
    );
    const second_item = await screen.findByTestId(
      `accordion-button-${mockCrawlersList[1].id}`
    );
    const third_item = await screen.findByTestId(
      `accordion-button-${mockCrawlersList[2].id}`
    );

    expect(first_item).toBeInTheDocument();
    expect(second_item).toBeInTheDocument();
    expect(third_item).toBeInTheDocument();
  });

  it("should render crawl details status done without links", async () => {
    setup();

    const item = await screen.findByTestId(
      `accordion-button-${mockCrawlersList[0].id}`
    );

    expect(item).toBeInTheDocument();

    fireEvent.click(item);

    expect(mockCrawlService.getCrawlDetails).toBeCalled();

    const status = await screen.findByText(`done`);
    const linksFound = await screen.findByText(`${LINKS_FOUND}0`);
    const message = await screen.findByText(`${NOT_FOUND_RECORDS}`);

    expect(status).toBeInTheDocument();
    expect(linksFound).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });

  it("should render crawl details status done with links", async () => {
    const newMockCrawlService: any = mockCrawlService;

    newMockCrawlService.getCrawlDetails = jest.fn(async () => {
      return {
        status: 200,
        data: mockCrawlDataStatusDoneWithLinks,
      };
    });

    setup();

    const item = await screen.findByTestId(
      `accordion-button-${mockCrawlersList[0].id}`
    );

    expect(item).toBeInTheDocument();

    fireEvent.click(item);

    expect(mockCrawlService.getCrawlDetails).toBeCalled();

    const status = await screen.findByText(`done`);
    const linksFound = await screen.findByText(`${LINKS_FOUND}3`);
    const message = await screen.queryByText(`${NOT_FOUND_RECORDS}`);

    expect(status).toBeInTheDocument();
    expect(linksFound).toBeInTheDocument();
    expect(message).not.toBeInTheDocument();
  });

  it("should render crawl details status active without links", async () => {
    const newMockCrawlService: any = mockCrawlService;

    newMockCrawlService.getCrawlDetails = jest.fn(async () => {
      return {
        status: 200,
        data: mockCrawlDataStatusActiveWithoutLinks,
      };
    });

    setup();

    const item = await screen.findByTestId(
      `accordion-button-${mockCrawlersList[0].id}`
    );

    expect(item).toBeInTheDocument();

    fireEvent.click(item);

    expect(mockCrawlService.getCrawlDetails).toBeCalled();

    const status = await screen.findByText(`active`);
    const linksFound = await screen.findByText(`${LINKS_FOUND}0`);
    const message = await screen.findByText(`${CARRYING_OUT_SEARCH}`);

    expect(status).toBeInTheDocument();
    expect(linksFound).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });

  it("should render crawl details status active with links", async () => {
    const newMockCrawlService: any = mockCrawlService;

    newMockCrawlService.getCrawlDetails = jest.fn(async () => {
      return {
        status: 200,
        data: mockCrawlDataStatusActiveWithLinks,
      };
    });

    setup();

    const item = await screen.findByTestId(
      `accordion-button-${mockCrawlersList[0].id}`
    );

    expect(item).toBeInTheDocument();

    fireEvent.click(item);

    expect(mockCrawlService.getCrawlDetails).toBeCalled();

    const status = await screen.findByText(`active`);
    const linksFound = await screen.findByText(`${LINKS_FOUND}3`);
    const message = await screen.queryByText(`${CARRYING_OUT_SEARCH}`);

    expect(status).toBeInTheDocument();
    expect(linksFound).toBeInTheDocument();
    expect(message).not.toBeInTheDocument();
  });

  it("should call deleteAllCrawlers when click in celar all button", async () => {
    setup();

    const clearButton = await screen.findByRole("button", {
      name: "clear all",
    });

    fireEvent.click(clearButton);

    expect(mockCrawlService.deleteAllCrawlers).toBeCalled();
  });

  it("should click in refresh button and update get new links", async () => {
    const pointerMockCrawlService: any = mockCrawlService;

    pointerMockCrawlService.getCrawlDetails = jest.fn(async () => {
      return {
        status: 200,
        data: mockCrawlDataStatusActiveWithLinks,
      };
    });

    const { debug } = setup();

    const item = await screen.findByTestId(
      `accordion-button-${mockCrawlersList[0].id}`
    );

    expect(item).toBeInTheDocument();

    fireEvent.click(item);

    const refreshButton = await screen.findByTestId("refresh-button");

    expect(refreshButton).toBeInTheDocument();

    mockCrawlDataStatusActiveWithLinks.urls.push("https://www.new-link.com/");

    pointerMockCrawlService.getCrawlDetails = jest.fn(async () => {
      return {
        status: 200,
        data: mockCrawlDataStatusActiveWithLinks,
      };
    });

    fireEvent.click(refreshButton);

    const status = await screen.findByText(`active`);

    expect(status).toBeInTheDocument();

    const newLink = await screen.findByText(`https://www.new-link.com/`);

    expect(newLink).toBeInTheDocument();
  });
});
