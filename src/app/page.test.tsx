import Page from "@/app/page";
import { render, screen } from "@testing-library/react";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Page />);

    const heading = screen.getByTestId("axur-logo");

    expect(heading).toBeInTheDocument();
  });
});
