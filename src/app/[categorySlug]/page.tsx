import {
  getAllCategories,
  getPages
} from '@/lib/microcms';

import { notFound } from 'next/navigation';
import styles from './page.module.css'
import BlogRow from '@/comp/BlogRow/BlogRow';
import Link from 'next/link';

import PageNumbers from '@pagenumbers/pageNumbers'

export async function generateStaticParams() {
  const categories = await getAllCategories()
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{
    categorySlug: string;
  }>;
}) {
  const { categorySlug } = await params;
  const categories = await getAllCategories()
  const categoryData = categories.find((row) => row.slug == categorySlug)

  if (!categoryData) notFound();

  const pages = await getPages(categoryData.id)

  const totalPages = Math.ceil(pages.totalCount / pages.limit);
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
          {categoryData.name}のブログ: {pages.totalCount}件
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
        pageNum={1}
        startNum={1}
        endNum={endPages}
        lastNum={totalPages}
        slug={categorySlug}
      />
      
    </div>
  );
}