import HomePage from "@/app/page";
import { render, screen } from "@testing-library/react";

describe("Home", () => {
  it("renders a heading", () => {
    render(<HomePage />);

    const heading = screen.getByText("Get started by editing");

    expect(heading).toBeInTheDocument();
  });
});
