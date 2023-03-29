import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { SignInButton } from ".";
import "jest";

jest.mock("next-auth/react");

describe("SignInButton component", () => {
  it("renders correctly when user is not authenticated", () => {
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked?.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });

    render(<SignInButton />);

    // @ts-ignore
    expect(screen.getByText("Sign in with Github")).toBeInTheDocument();
  });

  it("renders correctly when user is authenticated", () => {
    const session = {
      user: {
        name: "John Doe",
        email: "john@doe.com",
        image: "/images/avatar.svg",
      },
      expires: "fake-expires",
    };

    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked?.mockReturnValueOnce({
      data: session,
      status: "authenticated",
    });

    render(<SignInButton />);

    // @ts-ignore
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
});
