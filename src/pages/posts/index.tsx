import styles from "./styles.module.scss";

import Head from "next/head";
import { GetStaticProps } from "next";
import { getPrismicClient } from "@/services/prismic";

import Prismic from "@prismicio/client";

import { Result } from "./types";

import Link from "next/link";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
};

interface PostsProps {
  posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts?.map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`}>
              <time>{post.updatedAt}</time>
              <strong>{post.title}</strong>
              <p>{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query(
    [Prismic.predicates.at("document.type", "publication")],
    {
      fetch: ["publication.title", "publication.content"],
      pageSize: 100,
    }
  );

  const responseResults = response?.results as Result[];

  const posts = responseResults?.map((post) => {
    return {
      slug: post.uid,
      title: post.data?.title,
      excerpt:
        post.data?.content.find((content) => content.type === "paragraph")
          ?.text ?? "",
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      ),
    };
  });

  return {
    props: {
      posts,
    },
  };
};
