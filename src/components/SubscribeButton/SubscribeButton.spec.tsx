import { render, screen, fireEvent } from "@testing-library/react";
import { signIn, useSession } from "next-auth/react";
import { SubscribeButton } from ".";
import { useRouter } from "next/dist/client/router";
import "jest";

jest.mock("next-auth/react");
jest.mock("next/dist/client/router", () => ({
  useRouter: jest.fn(),
}));

describe("SubscribeButton component", () => {
  it("renders correctly ", () => {
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked?.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });

    render(<SubscribeButton />);

    expect(screen.getByText("Subscribe now")).toBeInTheDocument();
  });

  it("redirects user to sign in when not authenticated", () => {
    const signInMocked = jest.mocked(signIn);

    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked?.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscribe now");

    fireEvent.click(subscribeButton);

    expect(signInMocked).toHaveBeenCalled();
  });

  it("redirects to posts when user already has active subscription", () => {
    const useRouterMocked = jest.mocked(useRouter);
    const useSessionMocked = jest.mocked(useSession);

    const pushMock = jest.fn();

    const session = {
      user: {
        name: "John Doe",
        email: "john@doe.com",
        image: "/images/avatar.svg",
      },
      activeSubscription: "fake-active-subscription",
      expires: "fake-expires",
    };

    useSessionMocked?.mockReturnValueOnce({
      data: session,
      status: "authenticated",
    });

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscribe now");

    fireEvent.click(subscribeButton);

    expect(pushMock).toHaveBeenCalledWith("/posts");
  });
});
