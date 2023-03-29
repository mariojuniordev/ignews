import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import "jest";
import PostPreview, { getStaticProps } from "@/pages/posts/preview/[slug]";
import { useRouter } from "next/dist/client/router";
import { getPrismicClient } from "@/services/prismic";

const post = {
  slug: "my-new-post",
  title: "My New Post",
  content: "<p>Post excerpt</p>",
  updatedAt: "10 de Abril",
};

jest.mock("next-auth/react");
jest.mock("../../services/prismic");
jest.mock("next/dist/client/router", () => ({
  useRouter: jest.fn(),
}));

describe("Post preview page", () => {
  it("renders correctly", () => {
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked?.mockReturnValueOnce({
      data: {
        // @ts-ignore
        activeSubscription: false,
      },
      status: "unauthenticated",
    });

    render(<PostPreview post={post} />);

    expect(screen.getByText("My New Post")).toBeInTheDocument();
    expect(screen.getByText("Post excerpt")).toBeInTheDocument();
    expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument();
  });

  it("redirects user to full post when user is subscribed", async () => {
    const useSessionMocked = jest.mocked(useSession);
    const useRouterMocked = jest.mocked(useRouter);
    const pushMock = jest.fn();

    useSessionMocked?.mockReturnValueOnce({
      data: {
        activeSubscription: "fake-subscription",
      },
      status: "unauthenticated",
    } as any);

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    render(<PostPreview post={post} />);

    expect(pushMock).toHaveBeenCalledWith("/posts/my-new-post");
  });

  it("loads initial data", async () => {
    const getPrismiscClientMocked = jest.mocked(getPrismicClient);

    getPrismiscClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: "My new post",
          content: [
            {
              type: "paragraph",
              text: "Post content",
            },
          ],
        },
        last_publication_date: "04-01-2021",
      }),
    } as any);

    const response = await getStaticProps({
      params: { slug: "my-new-post" },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: "my-new-post",
            title: "My new post",
            content: "<p>Post content</p>",
            updatedAt: "01 de abril de 2021",
          },
          redirect: 1800,
        },
      })
    );
  });
});
