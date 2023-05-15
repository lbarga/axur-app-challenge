import Home from "@/app/page";
import { render, screen } from "@testing-library/react";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByText("Get started by editing");

    expect(heading).toBeInTheDocument();
  });
});
