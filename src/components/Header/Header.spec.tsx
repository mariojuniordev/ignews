import { render, screen } from "@testing-library/react";
import { Header } from ".";
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

jest.mock("next-auth/react", () => {
  return {
    useSession() {
      return [null, false];
    },
  };
});

describe("Header component", () => {
  it("renders correctly", () => {
    render(<Header />);

    // @ts-ignore
    expect(screen.getByText("Home")).toBeInTheDocument();

    // @ts-ignore
    expect(screen.getByText("Posts")).toBeInTheDocument();
  });
});
