
import styles from '../../page.module.css';
import { notFound } from 'next/navigation';

import {
  getPages,
  getAllCategories,
  getTopCategorySections
} from '@/lib/microcms';

import BlogRow from '@/comp/BlogRow/BlogRow';
import Link from 'next/link';
import PageNumbers from '@pagenumbers/pageNumbers'

export async function generateStaticParams() {
  const categories = await getTopCategorySections()

  const params: { categorySlug: string; pageNumber: string }[] = [];
  for (const category of categories) {
    const totalPages = Math.max(1, Math.ceil(category.count / category.limit));
    for (let i = 2; i <= totalPages; i++) {
      params.push({
        categorySlug: category.slug,
        pageNumber: String(i),
      });
    }
  }
  return params;
}

export default async function CategoryPaginatedPage({
  params,
}: {
  params: Promise<{
    categorySlug: string;
    pageNumber: string;
  }>;
}) {
  const { categorySlug, pageNumber } = await params;
  const currentPage = Number(pageNumber);

  // 数値でない、または1未満の場合は404
  if (Number.isNaN(currentPage) || currentPage < 1) {
    notFound();
  }

  const categories = await getAllCategories()
  const category = categories.find((row) => row.slug == categorySlug)

  if (!category) notFound();

  const pages = await getPages(category.id, currentPage)

  // 記事が0件、または存在しないページ番号なら404
  const totalPages = Math.ceil(pages.totalCount / pages.limit);
  
  if (pages.totalCount === 0 || currentPage > totalPages) {
    notFound();
  }

  const startNum = currentPage - 2 <= 0 ? 1 : currentPage - 2
  const endPages = totalPages <= 3 ? totalPages : 3
  

  return (
    <div className={styles.main}>
      <div className={styles.categoriesArea}>
        <Link
          className={styles.category}
          href='/blog'
        >
          すべて
        </Link>
        {categories.map((row, id) => (
          <Link
            key={id}
            href={`/${row.slug}`}
            className={`${styles.category} ${row.slug == categorySlug && `${styles.selected}`}`}
          >
            {row.name}
          </Link>
        ))}
      </div>

      <div className={styles.pagesArea}>
        <div className={styles.SelectCategory}>
          {category.name}のブログ: {pages.totalCount}件
        </div>
        {pages.contents.map((row) => (
          <div key={row.id}>
            <BlogRow
              pageData={row}
            />
          </div>
        ))}
      </div>

      <PageNumbers
        pageNum={currentPage}
        startNum={startNum}
        endNum={endPages}
        lastNum={totalPages}
        slug={categorySlug}
      />
    </div>
  );
}