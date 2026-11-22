import styles from '../../page.module.css';

import {
  getPages,
  getAllCategories
} from '@/lib/microcms';

import { notFound } from 'next/navigation';

import BlogRow from '@/comp/BlogRow/BlogRow';
import Link from 'next/link';

import PageNumbers from '@pagenumbers/pageNumbers'

export async function generateStaticParams() {
  const pages = await getPages();
  const params: { pageNumber: string }[] = [];

  const totalPages = Math.ceil(pages.totalCount / pages.limit)
  for (let i = 2; i <= totalPages; i++) {
    params.push({
      pageNumber: String(i),
    });
  }
  return params;
}



export default async function CategoryPaginatedPage({
  params,
}: {
  params: Promise<{
    pageNumber: string;
  }>;
}) {
  const { pageNumber } = await params;
  const currentPage = Number(pageNumber);

  // 数値でない、または1未満の場合は404
  if (Number.isNaN(currentPage) || currentPage < 1) {
    notFound();
  }

  const pages = await getPages('', currentPage);
  const categories = await getAllCategories()
  // 記事が0件、または存在しないページ番号なら404
  const totalPages = Math.ceil(pages.totalCount / pages.limit);

  if (pages.totalCount === 0 || currentPage > totalPages) {
    notFound();
  }

  const startNum = currentPage - 2 <= 0 ? 1 : currentPage - 2
  const endPages = totalPages <= 3 ? totalPages : 3
  
  return (
    <div className={styles.container}>
      <div className={styles.categoriesArea}>
        <div className={styles.all}>
          すべて
        </div>
        {categories.map((row, id) => (
          <Link
            key={id}
            href={`/${row.slug}`}
            className={styles.category}
          >
            {row.name}
          </Link>
        ))}
      </div>

      <div className={styles.pagesArea}>
        <div className={styles.SelectCategory}>
          すべてのブログ: {pages.totalCount}件
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
        slug='blog'
      />
    </div>
  );
}
