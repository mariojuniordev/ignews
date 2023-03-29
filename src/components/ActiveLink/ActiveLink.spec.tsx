import { render, screen } from "@testing-library/react";
import { ActiveLink } from ".";
import "jest";

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/",
      };
    },
  };
});

describe("ActiveLink component", () => {
  it("renders correctly", () => {
    render(
      <ActiveLink href="/" activeClassName="active">
        Home
      </ActiveLink>
    );

    expect(screen.getByText("Home")).toBeDefined();
  });

  it("adds active class if the link is currently active", () => {
    const { getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        Home
      </ActiveLink>
    );

    // @ts-ignore
    expect(screen.getByText("Home")).toHaveClass("active");
  });
});
