import styles from './page.module.css'
import type { Metadata } from 'next';
import { getPostBySlug } from '@/lib/microcms';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type Props = {
  params: Promise<{
    categorySlug: string;
    slug: string;
  }>;
};

// 1. 動的メタデータ（タイトルやOGPの設定）
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug, slug } = await params;
  const post = await getPostBySlug(slug);

  // 記事がない、またはURLのカテゴリーが記事本来のカテゴリーと違う場合
  if (!post || post.category.slug !== categorySlug) {
    return {
      title: '記事が見つかりません',
    };
  }

  return {
    title: post.title,
    openGraph: {
      title: post.title,
      images: post.eyecatch ? [post.eyecatch.url] : [],
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

  return (
    <div className={styles.main}>
      <div className={styles.content}>
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
        
        <div className={styles.Title}>
          {page.title}
        </div>
        
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
      </div>
    </div>
  )
}






