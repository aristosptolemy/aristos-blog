import type { Metadata } from 'next';

import {
  getAllCategories,
  getPages
} from '@/lib/microcms';

import { notFound } from 'next/navigation';
import styles from './page.module.css';
import BlogRow from '@/comp/BlogRow/BlogRow';
import Link from 'next/link';

import PageNumbers from '@pagenumbers/pageNumbers';
import { SITE_CONFIG } from '@config/site';

type Props = {
  params: Promise<{
    categorySlug: string;
  }>;
};

// 静的パラメータの生成
export async function generateStaticParams() {
  const categories = await getAllCategories();

  return categories.map((category) => ({
    categorySlug: category.slug,
  }));
}

// メタデータの生成
export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { categorySlug } = await params;

  const categories = await getAllCategories();
  const category = categories.find(
    (row) => row.slug === categorySlug
  );

  if (!category) {
    return {
      title: 'カテゴリが見つかりません',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${category.name}の記事一覧`;
  const description = category.description?.trim()
    || `${SITE_CONFIG.name}の${category.name}に関する記事一覧です。`;

  return {
    title,
    description,

    alternates: {
      canonical: `/${categorySlug}`,
    },

    openGraph: {
      type: 'website',
      title,
      description,
      url: `${SITE_CONFIG.url}/${categorySlug}`,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
    },

    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}

export default async function CategoryPage({
  params,
}: Props) {
  const { categorySlug } = await params;

  const categories = await getAllCategories();
  const categoryData = categories.find(
    (row) => row.slug === categorySlug
  );

  if (!categoryData) notFound();

  const pages = await getPages(categoryData.id);

  const totalPages = Math.ceil(
    pages.totalCount / pages.limit
  );

  const endPages = Math.min(totalPages, 3);

  return (
    <div className={styles.main}>
      <nav
        className={styles.categoriesArea}
        aria-label="記事カテゴリ"
      >
        <Link
          className={styles.category}
          href="/blog"
        >
          すべて
        </Link>

        {categories.map((row) => (
          <Link
            key={row.id}
            href={`/${row.slug}`}
            className={`${styles.category} ${
              row.slug === categorySlug
                ? styles.selected
                : ''
            }`}
            aria-current={
              row.slug === categorySlug
                ? 'page'
                : undefined
            }
          >
            {row.name}
          </Link>
        ))}
      </nav>

      <div className={styles.pagesArea}>
        <h1 className={styles.SelectCategory}>
          {categoryData.name}のブログ: {pages.totalCount}件
        </h1>

        {pages.contents.map((row) => (
          <div key={row.id}>
            <BlogRow pageData={row} />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <PageNumbers
          pageNum={1}
          startNum={1}
          endNum={endPages}
          lastNum={totalPages}
          slug={categorySlug}
        />
      )}
    </div>
  );
}