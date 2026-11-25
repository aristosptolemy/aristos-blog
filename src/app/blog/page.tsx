import styles from './page.module.css'
import {
  getPages,
  getAllCategories
} from '@/lib/microcms';

import BlogRow from '@/comp/BlogRow/BlogRow';
import PageNumbers from '@pagenumbers/pageNumbers'

import Link from 'next/link';


export const PER_PAGE = 10;


export default async function Blogs() {
  const Pages = await getPages()
  const categories = await getAllCategories()

  // 記事が0件、または存在しないページ番号なら404
  const totalPages = Math.ceil(Pages.totalCount / Pages.limit);
  
  const endPages = totalPages <= 3 ? totalPages : 3

  return (
    <div className={styles.main}>
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
          すべてのブログ: {Pages.totalCount}件
        </div>
        {Pages.contents.map((row) => (
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
        slug='blog'
      />
    </div>
  )
}










