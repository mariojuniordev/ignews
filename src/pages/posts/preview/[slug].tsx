import { getPrismicClient } from "@/services/prismic";
import { GetStaticPaths, GetStaticProps } from "next";
import { RichText } from "prismic-dom";
import Head from "next/head";

import styles from "./post.module.scss";
import Link from "next/dist/client/link";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/dist/client/router";

interface PostPreviewProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

interface PrismicResponse {
  last_publication_date: string;
  data: {
    title: string;
    content: string;
  };
}

export default function PostPreview({ post }: PostPreviewProps) {
  const { data } = useSession();

  const router = useRouter();

  useEffect(() => {
    // @ts-ignore
    if (data?.activeSubscription) {
      router.push(`/posts/${post.slug}`);
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>

          <div
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className={styles.continueReading}>
            Wanna continue reading?
            <Link href="/">Subscribe now 🤗</Link>
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };

  const prismic = getPrismicClient();

  const response = (await prismic.getByUID(
    "publication",
    String(slug),
    {}
  )) as PrismicResponse;

  const post = {
    slug,
    title: response?.data?.title,
    // @ts-ignore
    content: RichText.asHtml(response?.data?.content.splice(0, 3)),
    updatedAt: new Date(response?.last_publication_date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),
  };

  return {
    props: {
      post,
      redirect: 60 * 30, // 30 minutes
    },
  };
};
