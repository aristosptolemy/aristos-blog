import styles from './page.module.css'
import type { Metadata } from 'next';
import { getPostBySlug } from '@/lib/microcms';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import CommentWrapper from '@comp/Comment/CommentWrapper'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { SITE_CONFIG } from '@config/site';

type Props = {
  params: Promise<{
    categorySlug: string;
    slug: string;
  }>;
};

// 1. 動的メタデータ（タイトルやOGPの設定）
const BASE_URL = SITE_CONFIG.url;

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { categorySlug, slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || post.category.slug !== categorySlug) {
    return {
      title: '記事が見つかりません',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const url = `${BASE_URL}/${categorySlug}/${slug}`;

  return {
    title: post.title,
    description: post.description,

    // 正規URL
    alternates: {
      canonical: url,
    },

    // OGP
    openGraph: {
      type: 'article',
      title: post.title,
      url,
      siteName: 'Logtsumu Blog',
      locale: 'ja_JP',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      images: post.eyecatch
        ? [
            {
              url: post.eyecatch.url,
              alt: post.title,
            },
          ]
        : [],
    },

    // Twitterカード
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      images: post.eyecatch
        ? [post.eyecatch.url]
        : [],
    },
  };
}


export default async function Page({
  params,
}: {
  params: Promise<{
    slug: string;
    categorySlug: string;
  }>;
}) {

  const { categorySlug, slug } = await params;
  const page = await getPostBySlug(slug);
  

  if (!page) {
    notFound();
  }

  if (page.category.slug !== categorySlug) {
    notFound();
  }

  const lastUpdate = new Date(page.updatedAt).toLocaleDateString('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replaceAll('/', '-')

  const articleUrl = `${BASE_URL}/${categorySlug}/${slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    description: page.description,

    headline: page.title,
    url: articleUrl,

    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },

    image: page.eyecatch
      ? [page.eyecatch.url]
      : undefined,

    datePublished: page.publishedAt,
    dateModified: page.updatedAt,

    author: {
      '@type': 'Person',
      name: 'アリストス',
      url: `${BASE_URL}/about`,
    },

    publisher: {
      '@type': 'Organization',
      name: 'Logtsumu Blog',
      url: BASE_URL,
    },

    articleSection: page.category.name,
    inLanguage: 'ja',
  };

  return (
    <div className={styles.main}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <article className={styles.content}>
        <div className={styles.topArea}>
          <div className={styles.linkList}>
            <Link
              href='/'
              className={styles.link}
            >ホーム</Link>
            <ArrowForwardIosIcon/>
            <Link
              href={`/${page.category.slug}`}
              className={styles.link}
            >{page.category.name}</Link>
            <ArrowForwardIosIcon/>
          </div>

          <div className={styles.updateArea}>
            <div className={styles.updateLabel}>
              最終更新日時:
            </div>
            <div className={styles.updatedAt}>
              {lastUpdate}
            </div>
          </div>

        </div>
        
        <h1 className={styles.Title}>
          {page.title}
        </h1>
        
        <div className={styles.ContentArea}>
          {page.content && (
            <div
              className={styles.richText}
              dangerouslySetInnerHTML={{
                __html: page.content,
              }}
            />
          )}
        </div>
      </article>
      <CommentWrapper id={page.id} />

    </div>
  )
}






