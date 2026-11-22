import Link from "next/link";
import styles from "./page.module.css";
import {
  getTopCategorySections
} from '@/lib/microcms';

import Image from 'next/image'

export default async function Home() {
  const categoryPages = await getTopCategorySections()
  return (
    <div className={styles.page}>
      <div className={styles.category}>
        {categoryPages.map((row) => (
          <div
            key={row.id}
            className={styles.blogsArea}
          >
            <div className={styles.categoryNameArea}>
              <div className={styles.categoryName}>{row.name}</div>
              <Link href={`/${row.slug}`}>記事一覧へ</Link>
            </div>

            <div className={styles.pages}>
              {row.posts.slice(0, 5).map((page) => (
                <Link
                  key={page.id}
                  className={styles.pageItem}
                  href={`/${row.slug}/${page.slug}`}
                >
                  <Image
                    src={page.eyecatch.url}
                    alt=""
                    width={150}
                    height={100}
                    className={styles.thumbnail}
                    unoptimized
                  />
                  <div>{page.title}</div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}