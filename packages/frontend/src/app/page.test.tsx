import { STRING } from "@/constant/string";
import { ContextWrapper } from "@/context/_context";
import { makeHomePage } from "@/factory/page/home-page-factory";
import { AxrengServiceModel } from "@/model/axreng-service-model";
import { ExpressServiceModel } from "@/model/express-service-model";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";

const { LINKS_FOUND, NOT_FOUND_RECORDS, CARRYING_OUT_SEARCH } = STRING;

const mockCrawlersList = [
  {
    crawler_id: "LXUDKgJG",
    keyword: "something",
    created_at: "2023-05-19T21:02:23.390Z",
  },
  {
    crawler_id: "cVsLBz7b",
    keyword: "new one",
    created_at: "2023-05-19T21:06:59.721Z",
  },
  {
    crawler_id: "mTrZzD1u",
    keyword: "new two",
    created_at: "2023-05-20T21:06:59.721Z",
  },
];

const mockCrawlDataStatusDoneWithoutLinks = {
  crawler_id: "cVsLBz7b",
  status: "done",
  urls: [],
};

const mockCrawlDataStatusDoneWithLinks = {
  crawler_id: "LXUDKgJG",
  status: "done",
  urls: [
    "http://hiring.axreng.com/htmlman1/ldapsearch.1.html",
    "http://hiring.axreng.com/htmlman1/setpriv.1.html",
    "http://hiring.axreng.com/htmlman1/shred.1.html",
  ],
};

const mockCrawlDataStatusActiveWithoutLinks = {
  crawler_id: "LXUDKgJG",
  status: "active",
  urls: [],
};

const mockCrawlDataStatusActiveWithLinks = {
  crawler_id: "LXUDKgJG",
  status: "active",
  urls: [
    "http://hiring.axreng.com/htmlman1/ldapsearch.1.html",
    "http://hiring.axreng.com/htmlman1/setpriv.1.html",
    "http://hiring.axreng.com/htmlman1/shred.1.html",
  ],
};

const mockAxrengService = {
  searchCrawl: jest.fn(async () => {
    return {
      status: 200,
      data: { crawler_id: "p8Kd0kRS" },
    };
  }),
  getCrawlDetails: jest.fn(async () => {
    return {
      status: 200,
      data: mockCrawlDataStatusDoneWithoutLinks,
    };
  }),
};

const mockExpressService = {
  saveCrawler: jest.fn(),
  getCrawlers: jest.fn(() => {
    return {
      data: mockCrawlersList,
    };
  }),
  deleteAllCrawlers: jest.fn(),
};

const setup = async (axrengServiceParam: any = mockAxrengService) => {
  const utils = render(
    <>
      <ContextWrapper>
        {makeHomePage({
          axrengServiceParam:
            axrengServiceParam as unknown as AxrengServiceModel,
          expressServiceParam:
            mockExpressService as unknown as ExpressServiceModel,
        })}
      </ContextWrapper>
    </>
  );

  const input = (await utils.findByPlaceholderText(
    "keyword"
  )) as unknown as HTMLInputElement;

  return {
    input,
    ...utils,
  };
};

describe("Home", () => {
  it("should render home correctly", async () => {
    await setup();

    const heading = await screen.findByTestId("axur-logo");

    expect(heading).toBeInTheDocument();
  });

  it("should change input value and call search", async () => {
    const { input } = await setup();

    act(() => {
      fireEvent.change(input, { target: { value: "something" } });
    });

    expect(input.value).toBe("something");

    const searchButton = await screen.findByTestId("search-button");

    act(() => {
      fireEvent.click(searchButton);
    });

    expect(mockAxrengService.searchCrawl).toBeCalledWith("something");
  });

  it("should call searchCrawl with input value", async () => {
    const { input } = await setup();

    waitFor(async () => {
      fireEvent.change(input, { target: { value: "something" } });

      expect(input.value).toBe("something");

      const searchButton = await screen.findByTestId("search-button");

      fireEvent.click(searchButton);

      expect(mockAxrengService.searchCrawl).toBeCalledWith("something");
    });
  });

  it("should render list of crawls correctly", async () => {
    await setup();

    const first_item = await screen.findByTestId(
      `accordion-button-${mockCrawlersList[0].crawler_id}`
    );
    const second_item = await screen.findByTestId(
      `accordion-button-${mockCrawlersList[1].crawler_id}`
    );
    const third_item = await screen.findByTestId(
      `accordion-button-${mockCrawlersList[2].crawler_id}`
    );

    expect(first_item).toBeInTheDocument();
    expect(second_item).toBeInTheDocument();
    expect(third_item).toBeInTheDocument();
  });

  it("should render crawl details status done without links", async () => {
    await setup();

    const item = await screen.findByTestId(
      `accordion-button-${mockCrawlersList[0].crawler_id}`
    );

    expect(item).toBeInTheDocument();

    fireEvent.click(item);

    expect(mockAxrengService.getCrawlDetails).toBeCalled();

    const status = await screen.findByText(`done`);
    const linksFound = await screen.findByText(`${LINKS_FOUND}0`);
    const message = await screen.findByText(`${NOT_FOUND_RECORDS}`);

    expect(status).toBeInTheDocument();
    expect(linksFound).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });

  it("should render crawl details status done with links", async () => {
    const newMockCrawlService: any = mockAxrengService;

    newMockCrawlService.getCrawlDetails = jest.fn(async () => {
      return {
        status: 200,
        data: mockCrawlDataStatusDoneWithLinks,
      };
    });

    await setup();

    const item = await screen.findByTestId(
      `accordion-button-${mockCrawlersList[0].crawler_id}`
    );

    expect(item).toBeInTheDocument();

    fireEvent.click(item);

    expect(mockAxrengService.getCrawlDetails).toBeCalled();

    const status = await screen.findByText(`done`);
    const linksFound = await screen.findByText(`${LINKS_FOUND}3`);
    const message = await screen.queryByText(`${NOT_FOUND_RECORDS}`);

    expect(status).toBeInTheDocument();
    expect(linksFound).toBeInTheDocument();
    expect(message).not.toBeInTheDocument();
  });

  it("should render crawl details status active without links", async () => {
    const newMockCrawlService: any = mockAxrengService;

    newMockCrawlService.getCrawlDetails = jest.fn(async () => {
      return {
        status: 200,
        data: mockCrawlDataStatusActiveWithoutLinks,
      };
    });

    await setup();

    const item = await screen.findByTestId(
      `accordion-button-${mockCrawlersList[0].crawler_id}`
    );

    expect(item).toBeInTheDocument();

    fireEvent.click(item);

    expect(mockAxrengService.getCrawlDetails).toBeCalled();

    const status = await screen.findByText(`active`);
    const linksFound = await screen.findByText(`${LINKS_FOUND}0`);
    const message = await screen.findByText(`${CARRYING_OUT_SEARCH}`);

    expect(status).toBeInTheDocument();
    expect(linksFound).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });

  it("should render crawl details status active with links", async () => {
    const newMockCrawlService: any = mockAxrengService;

    newMockCrawlService.getCrawlDetails = jest.fn(async () => {
      return {
        status: 200,
        data: mockCrawlDataStatusActiveWithLinks,
      };
    });

    await setup();

    const item = await screen.findByTestId(
      `accordion-button-${mockCrawlersList[0].crawler_id}`
    );

    expect(item).toBeInTheDocument();

    fireEvent.click(item);

    expect(mockAxrengService.getCrawlDetails).toBeCalled();

    const status = await screen.findByText(`active`);
    const linksFound = await screen.findByText(`${LINKS_FOUND}3`);
    const message = await screen.queryByText(`${CARRYING_OUT_SEARCH}`);

    expect(status).toBeInTheDocument();
    expect(linksFound).toBeInTheDocument();
    expect(message).not.toBeInTheDocument();
  });

  it("should call deleteAllCrawlers when click in celar all button", async () => {
    await setup();

    const clearButton = await screen.findByRole("button", {
      name: "clear all",
    });

    fireEvent.click(clearButton);

    expect(mockExpressService.deleteAllCrawlers).toBeCalled();
  });

  it("should click in refresh button and update get new links", async () => {
    const pointerMockCrawlService: any = mockAxrengService;

    pointerMockCrawlService.getCrawlDetails = jest.fn(async () => {
      return {
        status: 200,
        data: mockCrawlDataStatusActiveWithLinks,
      };
    });

    const { debug } = await setup();

    const item = await screen.findByTestId(
      `accordion-button-${mockCrawlersList[0].crawler_id}`
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
