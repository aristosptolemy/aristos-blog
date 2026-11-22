import styles from './page.module.css'
import Link from 'next/link';
import Image from 'next/image';

import type { blogPage } from '@/types/microcmsType'


interface BlogRow {
  pageData: blogPage
}

export default function BlogRow({
  pageData
}: BlogRow) {
  return (
    <div className={styles.main}>
      <Link
        className={styles.pageItem}
        href={`/${pageData.category.slug}/${pageData.slug}`}
      >
        <Image
          src={pageData.eyecatch.url}
          alt=""
          width={150}
          height={100}
          className={styles.thumbnail}
          unoptimized
        />
        <div className={styles.titleArea}>
          <div className={styles.createdAt}>
            {new Date(pageData.createdAt).toLocaleDateString()}
          </div>
          <div className={styles.title}>{pageData.title}</div>
        </div>
      </Link>
    </div>
  )
}







