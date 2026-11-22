import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

import type { blogPage } from '@/types/microcmsType'

// 記事やカテゴリーの型は lib/microcms.ts で定義しているものに置き換えてください
type Props = {
  categoryName: string;
  categorySlug: string;
  currentPages: blogPage[];
  currentPage: number;
  totalPages: number;
};

export function CategoryArticleList({
  categoryName,
  categorySlug,
  currentPages,
  currentPage,
  totalPages,
}: Props) {

  return (
    <div className={styles.container}>
      <div className={styles.mainArea}>

        <div className={styles.categoryNameArea}>
          <div className={styles.categoryName}>
            {categoryName}
            {totalPages > 1 && `（${currentPage} / ${totalPages} ページ）`}
          </div>
        </div>

        <div className={styles.pagesArea}>
          {currentPages.map((page) => (
            <Link
              key={page.id}
              className={styles.pageItem}
              href={`/${categorySlug}/${page.slug}`}
            >
              <Image
                src={page.eyecatch.url}
                alt=""
                width={150}
                height={100}
                className={styles.thumbnail}
                unoptimized
              />
              <div className={styles.titleArea}>
                <div className={styles.createdAt}>
                  {new Date(page.createdAt).toLocaleDateString()}
                </div>
                <div className={styles.title}>{page.title}</div>
              </div>
            </Link>
          ))}
        </div>

        {totalPages > 1 && (
          <nav className={styles.pagination} aria-label="ページネーション">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <Link
                key={num}
                href={num === 1 ? `/${categorySlug}` : `/${categorySlug}/page/${num}`}
                className={num === currentPage ? styles.activePage : styles.pageLink}
              >
                {num}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
}